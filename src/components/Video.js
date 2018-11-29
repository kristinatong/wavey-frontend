import React, { Component } from 'react'
import { connect } from 'react-redux';

  let stream;					// stream obtained from webcam
	let video;					// shows stream
	let captureCanvas;			// internal canvas for capturing full images from video
	let captureContext;			// context for capture canvas
	let diffCanvas;				// internal canvas for diffing downscaled captures
	let diffContext;			// context for diff canvas
	let motionCanvas;			// receives processed diff images
	let motionContext;			// context for motion canvas

	let captureCallback;		// called when an image has been captured and diffed

	let captureInterval;		// interval for continuous captures
	let captureIntervalTime;	// time between captures, in ms
	let captureWidth;			// full captured image width
	let captureHeight;			// full captured image height
	let diffWidth;				// downscaled width for diff/motion
	let diffHeight;				// downscaled height for diff/motion
	let isReadyToDiff;			// has a previous capture been made to diff against?
	let pixelDiffThreshold;		// min for a pixel to be considered significant
	let scoreThreshold;			// min for an image to be considered significant
	let includeMotionBox;		// flag to calculate and draw motion bounding box
	let includeMotionPixels;	// flag to create object denoting pixels with motion
  let coords;
  let testContext;
  let test;
  let spritePositionX;
  let spritePositionY;
  let count = 0;

class Video extends Component {
  state = {
    x: 0,
    y: 0,
    height: 0,
    left: 0,
    top: 0,
    width: 0,
    stream: null
  }

  componentDidMount() {
    let spriteCanvas = document.getElementsByClassName('konvajs-content')[0].getBoundingClientRect()


    this.setState({
      x: spriteCanvas.x,
      y: spriteCanvas.y,
      height: spriteCanvas.height,
      left: spriteCanvas.left,
      top: spriteCanvas.top,
      width: spriteCanvas.width,
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
    this.requestWebcam();
  }

  componentWillUnmount(){

    this.stop()
  }

  requestWebcam() {
    let constraints = {
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
    this.setState({
      stream: stream
    })
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

  stop = () => {
    clearInterval(captureInterval);
    // video.src = '';
    // motionContext.clearRect(0, 0, diffWidth, diffHeight);
    testContext.clearRect(0, 0, diffWidth, diffHeight);
    isReadyToDiff = false;
    this.state.stream.getVideoTracks()[0].stop();
  }

  drawSprites = () => {
    if(this.props.canvasSprites){
      this.props.canvasSprites.map(sprite => {
        const image = new window.Image();
        image.src = sprite.sprite.url
        image.onload = () => {
          testContext.save()
          testContext.scale(-1,1)
          testContext.drawImage(image, sprite.position.x-test.width+60, sprite.position.y, -60, 60)
          // testContext.drawImage(image,sprite.position.x,sprite.position.y,60,60)
          testContext.restore()
        }
      })
    }

  }

  capture = () => {
    // save a full-sized copy of capture
    captureContext.drawImage(video, 0, 0, captureWidth, captureHeight);
    let captureImageData = captureContext.getImageData(0, 0, captureWidth, captureHeight);
    testContext.drawImage(video, 0, 0, captureWidth, captureHeight);
    this.drawSprites()
    // diff current capture over previous capture, leftover from last time
    diffContext.globalCompositeOperation = 'difference';
    diffContext.drawImage(video, 0, 0, diffWidth, diffHeight);
    let diffImageData = diffContext.getImageData(0, 0, diffWidth, diffHeight);
    // console.log('diffImageData',diffImageData)

    if (isReadyToDiff) {
      let diff = this.processDiff(diffImageData);

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
    let rgba = diffImageData.data;

    // pixel adjustments are done by reference directly on diffImageData
    let score = 0;
    let motionPixels = includeMotionPixels ? [] : undefined;
    let motionBox = undefined;
    for (let i = 0; i < rgba.length; i += 4) {
      let pixelDiff = rgba[i] * 0.3 + rgba[i + 1] * 0.6 + rgba[i + 2] * 0.1;
      let normalized = Math.min(255, pixelDiff * (255 / pixelDiffThreshold));
      rgba[i] = 0;
      rgba[i + 1] = normalized;
      rgba[i + 2] = 0;

      if (pixelDiff >= pixelDiffThreshold) {
        score++;
        coords = this.calculateCoordinates(i / 4);
        console.log('coords', coords, 'pixelDiff',pixelDiff,'i',i)
        this.props.canvasSprites.map(sprite => {
          if(sprite.position.x === 0){
            // spritePositionX = 0
            spritePositionX = 54  //mirrored canvas
          }else{
            spritePositionX = 54-((sprite.position.x*diffWidth)/600)
          }
          if(sprite.position.y === 0){
            spritePositionY = 0
          }
          else{
            spritePositionY = (sprite.position.y*diffHeight)/450
          }

          console.log('spritePositionX',spritePositionX,'sprite.position.x',sprite.position.x)
          console.log('spritePositionY',spritePositionY,'sprite.position.y',sprite.position.y)
          if(coords.x >= spritePositionX && coords.x <= spritePositionX+10){
            if(coords.y >= spritePositionY && coords.y <= spritePositionY+6){
              console.log('%c TOUCHED IT ', 'color: red')
                count += 1
                if(count = 3){
                  if(document.getElementById(sprite.uniqueKey)){
                    let player = document.getElementById(sprite.uniqueKey)
                    player.paused ? player.play() : player.pause()
                  }
                  count = 0;
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
      y: Math.floor(pixelIndex / diffWidth)
    };
  }

  calculateMotionBox(currentMotionBox, x, y) {
    // init motion box on demand
    let motionBox = currentMotionBox || {
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

  render(){
    console.log('VIDEO PROPS', this.props)
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
      transform: 'rotateY(180deg)',
      WebkitTransform:'rotateY(180deg)',
      MozTransform:'rotateY(180deg)',
    }

    return(
      <div>
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
