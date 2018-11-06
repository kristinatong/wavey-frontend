import React, { Component } from 'react'
import { connect } from 'react-redux';
// import * as actions from '../actions/actions';
// import Konva from 'konva';
import { Image } from 'react-konva';

class Sprite extends Component{
  state = {
    image: null,
    isDragging: false,
    hover: false
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.sprite.url
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  handleDragStart = () => {
    this.setState({
      isDragging: true
    })
  }

  handleDragEnd = () => {
    this.setState({
      isDragging: false
    })
  }

  handleHover = (e) => {
    this.setState({
      hover: true
    })
    document.body.style.cursor = 'pointer'
  }

  handleHoverOut = (e) => {
    this.setState({
      hover: false
    })
    document.body.style.cursor = 'default'
  }

  render(){
    console.log('sprite state',this.state)
    console.log(document.body.style.cursor)
    return(
      <Image image={this.state.image}
          x={1}
          y={1}
          width={100}
          height={100}
          stroke='red'
          strokeWidth={5}
          draggable
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
          strokeEnabled={this.state.hover ? true : false}
          onMouseOver={(e) => this.handleHover(e)}
          onMouseOut={(e) => this.handleHoverOut(e)}
          />
    )
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sprite);
