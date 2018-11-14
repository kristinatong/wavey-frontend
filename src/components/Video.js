import React, { Component } from 'react'
import { connect } from 'react-redux';
// import * as actions from '../redux/actions';
// import { changeSprite } from '../actions/sprite'
// import Konva from 'konva';
import { Stage, Layer } from 'react-konva';
import SpriteList from './SpriteList'
import ControlBar from './ControlBar'
import UploadSound from './UploadSound'
import { DiffCamEngine } from './diff-cam-engine'
// import * from './adapter-1.0.7'

  var stream;					// stream obtained from webcam
	var video;					// shows stream
	var captureCanvas;			// internal canvas for capturing full images from video
	var captureContext;			// context for capture canvas
	var diffCanvas;				// internal canvas for diffing downscaled captures
	var diffContext;			// context for diff canvas
	var motionCanvas;			// receives processed diff images
	var motionContext;			// context for motion canvas

	var initSuccessCallback;	// called when init succeeds
	var initErrorCallback;		// called when init fails
	var startCompleteCallback;	// called when start is complete
	var captureCallback;		// called when an image has been captured and diffed

	var captureInterval;		// interval for continuous captures
	var captureIntervalTime;	// time between captures, in ms
	var captureWidth;			// full captured image width
	var captureHeight;			// full captured image height
	var diffWidth;				// downscaled width for diff/motion
	var diffHeight;				// downscaled height for diff/motion
	var isReadyToDiff;			// has a previous capture been made to diff against?
	var pixelDiffThreshold;		// min for a pixel to be considered significant
	var scoreThreshold;			// min for an image to be considered significant
	var includeMotionBox;		// flag to calculate and draw motion bounding box
	var includeMotionPixels;	// flag to create object denoting pixels with motion
  var coords;
  var testContext;
  var test;

class Video extends Component {
  state = {
    x: 0,
    y: 0,
    // bottom: 0,
    height: 0,
    left: 0,
    // right: 0,
    top: 0,
    width: 0,
    // captureInterval: null,
    // video: document.getElementById('video'),
    // motionCanvas : document.createElement('canvas'),
    // captureIntervalTime: 100,
    // captureWidth: 640,
    // captureHeight: 480,
    // diffWidth: 64,
    // diffHeight: 48,
    // pixelDiffThreshold: 32,
    // scoreThreshold: 16,
    // includeMotionBox: false,
    // includeMotionPixels: false,
  }

  componentDidMount() {
    let spriteCanvas = document.getElementsByClassName('konvajs-content')[0].getBoundingClientRect()

    this.setState({
      x: spriteCanvas.x,
      y: spriteCanvas.y,
      // bottom: spriteCanvas.bottom,
      height: spriteCanvas.height,
      left: spriteCanvas.left,
      // right: spriteCanvas.right,
      top: spriteCanvas.top,
      width: spriteCanvas.width,
      // captureWidth: spriteCanvas.width,
      // captureHeight: spriteCanvas.height,
    })

    motionCanvas = this.refs.motion
    test = this.refs.test

    // prep video

    // non-configurable
    captureCanvas = document.createElement('canvas');
    diffCanvas = document.createElement('canvas');
    isReadyToDiff = false;

    // prep capture canvas
    captureWidth= spriteCanvas.width;
    captureHeight= spriteCanvas.height;
    captureCanvas.width = captureWidth;
    captureCanvas.height = captureHeight;
    captureContext = captureCanvas.getContext('2d');

    // prep diff canvas
    diffWidth= 64;
    diffHeight= 48;
    diffCanvas.width = diffWidth;
    diffCanvas.height = diffHeight;
    diffContext = diffCanvas.getContext('2d');

    // prep motion canvas
    motionCanvas.width = diffWidth;
    motionCanvas.height = diffHeight;
    motionContext = motionCanvas.getContext('2d');

    //test canvas
    test.width = diffWidth;
    test.height = diffHeight;
    testContext = test.getContext('2d')

    captureIntervalTime= 100;

    pixelDiffThreshold= 32;
    scoreThreshold= 16;
    includeMotionBox= false;
    includeMotionPixels= false;

    captureCallback = function() {};

    // const drawSprites = () => {
    //   return this.props.canvasSprites.map(sprite => {
    //     const image = new window.Image();
    //     image.src = sprite.sprite.url
    //     image.onload = () => {
    //       testContext.save()
    //       testContext.scale(-1,1)
    //       testContext.drawImage(image, sprite.position.x-test.width+60, sprite.position.y, -60, 60)
    //       testContext.restore()
    //       // testContext.scale(-1,1)
    //       // testContext.drawImage(image, spriteCanvas.width-(60+sprite.position.x), sprite.position.y, 60, 60)
    //     }
    //   })
    // }

    // this.drawSprites()
    this.requestWebcam();
  }

  // getMotion = () => {
  //   var canvas = document.getElementById('motion');
  //   var video = document.getElementById('video');
  //   // var video = document.createElement('video')
  //   var score = document.getElementById('score');
  //   var test = document.getElementById('test')
  //   // var canvas = this.refs.motion;
  //   // var video = this.refs.video
  //   // var score = document.getElementById('score');
  //   // var test = this.refs.test
  //
  //   // let captureInterval = setInterval(DiffCamEngine.capture, 100);
  //   // console.log('captureinterval',captureInterval)
  //   // this.setState({
  //   //   captureInterval: captureInterval
  //   // })
  //
  //   function initSuccess() {
  //     DiffCamEngine.start();
  //   }
  //
  //   function initError() {
  //     alert('Something went wrong.');
  //   }
  //
  //   function capture(payload) {
  //     score.textContent = payload.score;
  //   }
  //
  //   DiffCamEngine.init({
  //     video: video,
  //     test: test,
  //     motionCanvas: canvas,
  //     initSuccessCallback: initSuccess,
  //     initErrorCallback: initError,
  //     captureCallback: capture
  //   });
  //   // this.requestWebcam();
  // }
  // captureCallback(payload) {
  //   score.textContent = payload.score;
  // }

  requestWebcam() {
    var constraints = {
      audio: false,
      video: {
        width: captureWidth,
        height: captureHeight
      }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(this.initSuccess)
      .catch(this.initError);
  }

  initSuccess = (requestedStream) => {
    console.log(requestedStream)
    stream = requestedStream
    // console.log(initSuccessCallback)
    // initSuccessCallback();
    this.start();
  }

  initError(error) {
    console.log(error);
    alert('Something went wrong.');
  }

  start = () => {
    // video = document.getElementById('video');
    video = document.createElement('video')
    video.autoplay = true
    if (!stream) {
      throw 'Cannot start after init fail';
    }

    // streaming takes a moment to start
    video.addEventListener('canplay', this.startComplete);
    video.srcObject = stream;
  }

  startComplete = () => {
    video.removeEventListener('canplay', this.startComplete);
    captureInterval = setInterval(this.capture, captureIntervalTime);
  }

  stop() {
    clearInterval(captureInterval);
    // video.src = '';
    // motionContext.clearRect(0, 0, diffWidth, diffHeight);
    testContext.clearRect(0, 0, diffWidth, diffHeight);
    isReadyToDiff = false;
  }

  drawSprites = () => {
    if(this.props.canvasSprites){
      this.props.canvasSprites.map(sprite => {
        const image = new window.Image();
        image.src = sprite.sprite.url
        image.onload = () => {
          testContext.save()
          // testContext.scale(-1,1)
          // testContext.drawImage(image, sprite.position.x-test.width+60, sprite.position.y, -60, 60)
          testContext.drawImage(image,sprite.position.x,sprite.position.y,60,60)
          testContext.restore()
        }
      })
    }
    // this.props.canvasSprites.map(sprite => {
    //   const image = new window.Image();
    //   image.src = sprite.sprite.url
    //   image.onload = () => {
    //     testContext.save()
    //     testContext.scale(-1,1)
    //     testContext.drawImage(image, sprite.position.x-test.width+60, sprite.position.y, -60, 60)
    //     testContext.restore()
    //   }
    // })
  }

  checkSpriteMotion = () => {

  }

  capture = () => {
    // save a full-sized copy of capture
    captureContext.drawImage(video, 0, 0, captureWidth, captureHeight);
    var captureImageData = captureContext.getImageData(0, 0, captureWidth, captureHeight);
    testContext.drawImage(video, 0, 0, captureWidth, captureHeight);
    this.drawSprites()
    // diff current capture over previous capture, leftover from last time
    diffContext.globalCompositeOperation = 'difference';
    diffContext.drawImage(video, 0, 0, diffWidth, diffHeight);
    var diffImageData = diffContext.getImageData(0, 0, diffWidth, diffHeight);
    // console.log('diffImageData',diffImageData)

    if (isReadyToDiff) {
      var diff = this.processDiff(diffImageData);

      motionContext.putImageData(diffImageData, 0, 0);
      if (diff.motionBox) {
        motionContext.strokeStyle = '#fff';
        motionContext.strokeRect(
          diff.motionBox.x.min + 0.5,
          diff.motionBox.y.min + 0.5,
          diff.motionBox.x.max - diff.motionBox.x.min,
          diff.motionBox.y.max - diff.motionBox.y.min
        );
      }
      captureCallback({
        imageData: captureImageData,
        score: diff.score,
        hasMotion: diff.score >= scoreThreshold,
        motionBox: diff.motionBox,
        motionPixels: diff.motionPixels,
        getURL: function() {
          return this.getCaptureUrl(this.imageData);
        },
        checkMotionPixel: function(x, y) {
          return this.checkMotionPixel(this.motionPixels, x, y)
        }
      });
    }

    // draw current capture normally over diff, ready for next time
    diffContext.globalCompositeOperation = 'source-over';
    diffContext.drawImage(video, 0, 0, diffWidth, diffHeight);
    isReadyToDiff = true;
  }

  processDiff(diffImageData) {
    var rgba = diffImageData.data;

    // pixel adjustments are done by reference directly on diffImageData
    var score = 0;
    var motionPixels = includeMotionPixels ? [] : undefined;
    var motionBox = undefined;
    for (var i = 0; i < rgba.length; i += 4) {
      var pixelDiff = rgba[i] * 0.3 + rgba[i + 1] * 0.6 + rgba[i + 2] * 0.1;
      var normalized = Math.min(255, pixelDiff * (255 / pixelDiffThreshold));
      rgba[i] = 0;
      rgba[i + 1] = normalized;
      rgba[i + 2] = 0;

      if (pixelDiff >= pixelDiffThreshold) {
        score++;
        coords = this.calculateCoordinates(i / 4);
        console.log('coords', coords, 'pixelDiff',pixelDiff,'i',i)
        this.props.canvasSprites.map(sprite => {
          if(coords.x >= sprite.position.x && coords.x <= sprite.position.x+10){
            if(coords.y >= sprite.position.y && coords.y <= sprite.position.y+10){
              console.log("TOUCHED ITTT")
                if(document.getElementById(sprite.uniqueKey)){
                  let player = document.getElementById(sprite.uniqueKey)
                  player.paused ? player.play() : player.pause()
                }
              }
            }
          })


        // if (includeMotionBox) {
        //   motionBox = this.calculateMotionBox(motionBox, coords.x, coords.y);
        // }
        //
        // if (includeMotionPixels) {
        //   motionPixels = this.calculateMotionPixels(motionPixels, coords.x, coords.y, pixelDiff);
        // }

      }
    }

    return {
      score: score,
      motionBox: score > scoreThreshold ? motionBox : undefined,
      motionPixels: motionPixels
    };
  }

  calculateCoordinates(pixelIndex) {
    return {
      x: pixelIndex % diffWidth,
      // y: Math.floor(pixelIndex / diffWidth)
      y: Math.floor(pixelIndex / diffHeight)
    };
  }

  calculateMotionBox(currentMotionBox, x, y) {
    // init motion box on demand
    var motionBox = currentMotionBox || {
      x: {
        min: coords.x,
        max: x
      },
      y: {
        min: coords.y,
        max: y
      }
    };

    motionBox.x.min = Math.min(motionBox.x.min, x);
    motionBox.x.max = Math.max(motionBox.x.max, x);
    motionBox.y.min = Math.min(motionBox.y.min, y);
    motionBox.y.max = Math.max(motionBox.y.max, y);

    return motionBox;
  }

  calculateMotionPixels(motionPixels, x, y, pixelDiff) {
    motionPixels[x] = motionPixels[x] || [];
    motionPixels[x][y] = true;

    return motionPixels;
  }

  getCaptureUrl(captureImageData) {
    // may as well borrow captureCanvas
    captureContext.putImageData(captureImageData, 0, 0);
    return captureCanvas.toDataURL();
  }

  checkMotionPixel(motionPixels, x, y) {
    return motionPixels && motionPixels[x] && motionPixels[x][y];
  }

  getPixelDiffThreshold() {
    return pixelDiffThreshold;
  }

  setPixelDiffThreshold(val) {
    pixelDiffThreshold = val;
  }

  getScoreThreshold() {
    return scoreThreshold;
  }

  setScoreThreshold(val) {
    scoreThreshold = val;
  }

  playSound = () => {

  }

  render(){
    console.log('VIDEO STATE', this.state)
    const videoStyle= {
      top: 0,
      left: 0,
      position: 'absolute',
      zIndex: 4,
      // background: 'gray',
    }

    const motionStyle= {
      top: this.state.top,
      left: this.state.left,
      position: 'absolute',
      zIndex: -1,
      // background: 'gray',
    }

    const testStyle= {
      top: this.state.top,
      left: this.state.left,
      position: 'absolute',
      zIndex: 4,
      background: 'black',
      // transform: 'rotateY(180deg)',
      // WebkitTransform:'rotateY(180deg)',
      // MozTransform:'rotateY(180deg)',
    }

    return(
      <div>
        {this.props.stopVideo ? this.stop() : null}
        <video id="video" style={videoStyle} width={this.state.width} height={this.state.height} ref='video'></video>
        <canvas id='motion' style={motionStyle} width={this.state.width} height={this.state.height} ref='motion'/>
        <canvas id='test' style={testStyle} width={this.state.width} height={this.state.height} ref='test'/>
        <span id="score"></span>
        <script src="https://webrtc.github.io/adapter/adapter-1.0.7.js"></script>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    canvasSprites: state.sprite.canvasSprites,
    stopVideo: state.sound.stopVideo
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
