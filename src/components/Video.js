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


class Video extends Component {
  state = {
    x: 0,
    y: 0,
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    captureImageData: null,
    captureCanvas: null,
    difCanvas: null,
    video: null,
    captureInterval: null
  }

  componentDidMount(){
    let spriteCanvas = document.getElementsByClassName('konvajs-content')[0].getBoundingClientRect()
    const captureCanvas = document.createElement('canvas');
    captureCanvas.width = spriteCanvas.width
    captureCanvas.height = spriteCanvas.height
		const diffCanvas = document.createElement('canvas');
    diffCanvas.width = spriteCanvas.width
    diffCanvas.height = spriteCanvas.height

    this.setState({
      x: spriteCanvas.x,
      y: spriteCanvas.y,
      bottom: spriteCanvas.bottom,
      height: spriteCanvas.height,
      left: spriteCanvas.left,
      right: spriteCanvas.right,
      top: spriteCanvas.top,
      width: spriteCanvas.width,
      captureCanvas: captureCanvas,
      diffCanvas: diffCanvas,
      video: this.refs.video
    })

    const canvas = this.refs.test
    const ctx = canvas.getContext('2d')

    this.props.canvasSprites.map(sprite =>{
      const image = new window.Image();
        image.src = sprite.sprite.url
        image.onload = () =>{
          ctx.drawImage(image,sprite.position.x,sprite.position.y, 60, 60)
        }
      }
    )
  }

  componentDidUpdate(){
    const canvas = this.refs.test
    const ctx = canvas.getContext('2d')
    ctx.drawImage(this.state.video,0,0)
    this.props.canvasSprites.map(sprite =>{
      const image = new window.Image();
        image.src = sprite.sprite.url
        image.onload = () =>{
          ctx.drawImage(image,sprite.position.x,sprite.position.y, 60, 60)
        }
      }
    )
  }



  getMotion(){
    var canvas = document.getElementById('motion');
    var video = document.getElementById('video');
    var score = document.getElementById('score');

    let captureInterval = setInterval(this.capture, 100);
    console.log('captureinterval',captureInterval)
    // this.setState({
    //   captureInterval: captureInterval
    // })

    function initSuccess() {
      DiffCamEngine.start();
    }

    function initError() {
      alert('Something went wrong.');
    }

    function capture(payload) {
      score.textContent = payload.score;
    }

    DiffCamEngine.init({
      video: video,
      motionCanvas: canvas,
      initSuccessCallback: initSuccess,
      initErrorCallback: initError,
      captureCallback: capture
    });
  }

  capture = () => {
    let video = this.refs.video
    this.setState({
      video: video
    })
    // let captureContext = this.state.captureCanvas.getContext('2d')
		// // save a full-sized copy of capture
		// captureContext.drawImage(this.state.video, 0, 0);
		// var captureImageData = captureContext.getImageData(0, 0);

		// test.drawImage(video, 0, 0, captureWidth, captureHeight);
		// // diff current capture over previous capture, leftover from last time
		// diffContext.globalCompositeOperation = 'difference';
		// diffContext.drawImage(video, 0, 0, diffWidth, diffHeight);
		// var diffImageData = diffContext.getImageData(0, 0, diffWidth, diffHeight);
		// console.log(diffImageData)
		// test.drawImage(video, 0, 0, diffWidth, diffHeight);
		// var zimage = document.getElementById('source');
		// test.drawImage(zimage, 33, 71, 104, 124, 21, 20, 87, 104);
    //
		// if (isReadyToDiff) {
		// 	var diff = processDiff(diffImageData);
    //
		// 	motionContext.putImageData(diffImageData, 0, 0);
		// 	if (diff.motionBox) {
		// 		motionContext.strokeStyle = '#fff';
		// 		motionContext.strokeRect(
		// 			diff.motionBox.x.min + 0.5,
		// 			diff.motionBox.y.min + 0.5,
		// 			diff.motionBox.x.max - diff.motionBox.x.min,
		// 			diff.motionBox.y.max - diff.motionBox.y.min
		// 		);
		// 	}
		// 	captureCallback({
		// 		imageData: captureImageData,
		// 		score: diff.score,
		// 		hasMotion: diff.score >= scoreThreshold,
		// 		motionBox: diff.motionBox,
		// 		motionPixels: diff.motionPixels,
		// 		getURL: function() {
		// 			return getCaptureUrl(this.imageData);
		// 		},
		// 		checkMotionPixel: function(x, y) {
		// 			return checkMotionPixel(this.motionPixels, x, y)
		// 		}
		// 	});
		// }
    //
		// // draw current capture normally over diff, ready for next time
		// diffContext.globalCompositeOperation = 'source-over';
		// diffContext.drawImage(video, 0, 0, diffWidth, diffHeight);
		// isReadyToDiff = true;
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
      background: 'red'
    }

    return(
      <div>
        <video id="video" style={videoStyle} width={this.state.width} height={this.state.height} autoplay ref='video'></video>
        <canvas id='motion' style={motionStyle} width={this.state.width} height={this.state.height}/>
        <canvas id='test' style={testStyle} width={this.state.width} height={this.state.height} ref='test'/>
        <span id="score"></span>
        <script src="https://webrtc.github.io/adapter/adapter-1.0.7.js"></script>
        {this.getMotion()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    canvasSprites: state.sprite.canvasSprites
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
