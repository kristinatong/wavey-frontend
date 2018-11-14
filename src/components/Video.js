import React, { Component } from 'react'
import { connect } from 'react-redux';
// import * as actions from '../redux/actions';
// import { changeSprite } from '../actions/sprite'
// import Konva from 'konva';
import { Stage, Layer } from 'react-konva';
import SpriteList from './SpriteList'
import ControlBar from './ControlBar'
import UploadSound from './UploadSound'


class Video extends Component {

  // onDragStart = (ev) => {
  //   console.log(this.props.sprites)
  //   // console.log('dragstart:', id);
  //   // ev.dataTransfer.setData("id", id);
  // }
  //
  // onDragOver = (ev) => {
  //   ev.preventDefault();
  // }
  //
  //
  // onDrop = (e) => {
  //   e.persist()
  //   let xStart = e.clientX-350
  //   let yStart = e.clientY-120
  //   const ctx = this.refs.spriteLayer.getContext('2d');
  //   var img = new Image()
  //   img.src = e.dataTransfer.getData("id")
  //   img.onload = function () {
  //     ctx.drawImage(img,xStart,yStart,80,80);
  //   }
  //   this.props.changeSprite(xStart,yStart)
  // }

  render(){
    const stageStyle = {
      backgroundColor: 'white',
      // border: '1px dotted red',
      margin: 'auto',
    }

    // return(
    //   <Fragment>
    //     <canvas width={480} height={360} style={stageStyle} ref='canvas' onDragOver={(e)=>this.onDragOver(e)}
    //       onDragStart = {(e) => this.onDragStart(e)} draggable/>
    //     <canvas width={480} height={360} style={stageStyle} ref='spriteLayer' onDragOver={(e)=>this.onDragOver(e)}
    //       onDragStart = {(e) => this.onDragStart(e)} draggable onDrop={this.onDrop}/>
    //   </Fragment>
    // )

    // <canvas width={600} height={360} style={{backgroundColor:'black'}} ref='videoLayer'/>

    return(
      <div id='main'>
        <div id='testdiv'>
          <Stage style={stageStyle} width={600} height={450}>
            <Layer>
              <SpriteList/>
            </Layer>
          </Stage>

          </div>
          <ControlBar/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
