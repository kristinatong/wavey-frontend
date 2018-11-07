import React, { Component } from 'react'
import { connect } from 'react-redux';
// import * as actions from '../actions/actions';
// import Konva from 'konva';
import { Image } from 'react-konva';
import { selectSprite } from '../actions/sprite'

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

  componentDidUpdate() {
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
    this.props.selectSprite(this.props.sprite)
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

  handleSelect = () => {
    this.props.selectSprite(this.props.sprite)
  }

  render(){
    // console.log('sprite state',this.state)
    // console.log('sprite props',this.props)
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
          onClick={this.handleSelect}
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
    selectSprite: (selectedSprite) => {
      dispatch(selectSprite(selectedSprite))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sprite);
