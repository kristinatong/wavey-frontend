import React, { Component } from 'react'
import { connect } from 'react-redux';
// import * as actions from '../redux/actions';
// import { changeSprite } from '../actions/sprite'
// import Konva from 'konva';
import { Stage, Layer, Image } from 'react-konva';
import SpriteList from './SpriteList'


class Canvas extends Component {

  onDragStart = (ev) => {
    console.log(this.props.sprites)
    // console.log('dragstart:', id);
    // ev.dataTransfer.setData("id", id);
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  }


  onDrop = (e) => {
    e.persist()
    let xStart = e.clientX-350
    let yStart = e.clientY-120
    const ctx = this.refs.spriteLayer.getContext('2d');
    var img = new Image()
    img.src = e.dataTransfer.getData("id")
    img.onload = function () {
      ctx.drawImage(img,xStart,yStart,80,80);
    }
    this.props.changeSprite(xStart,yStart)
  }

  render(){
    console.log('canvas props', this.props)
    const stageStyle = {
      position: 'absolute',
      left: '20%',
      top: '10%',
      backgroundColor: '#EEEEEE',
      border: '1px dotted'}

    // return(
    //   <Fragment>
    //     <canvas width={480} height={360} style={stageStyle} ref='canvas' onDragOver={(e)=>this.onDragOver(e)}
    //       onDragStart = {(e) => this.onDragStart(e)} draggable/>
    //     <canvas width={480} height={360} style={stageStyle} ref='spriteLayer' onDragOver={(e)=>this.onDragOver(e)}
    //       onDragStart = {(e) => this.onDragStart(e)} draggable onDrop={this.onDrop}/>
    //   </Fragment>
    // )

    return(
      <Stage style={stageStyle} width={700} height={525}>
        <Layer>
          <SpriteList/>
        </Layer>
      </Stage>
    )
  }
}

function mapStateToProps(state) {
  return {
    canvasSprites: state.sprite.canvasSprites,
  }
}

function mapDispatchToProps(dispatch){
  return {}
  // return{
  //   changeSprite: (x,y) => {
  //     dispatch(changeSprite(x,y))
  //   }
  // }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
