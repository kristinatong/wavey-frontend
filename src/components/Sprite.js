import React, { Component } from 'react'
import { connect } from 'react-redux';
// import * as actions from '../actions/actions';
// import Konva from 'konva';
import { Image } from 'react-konva';
// import { selectSprite } from '../actions/sprite'
import * as actions from '../actions/sprite'

class Sprite extends Component{
  state = {
    image: null,
    isDragging: false,
    // hover: false,
    uniqueKey: null,
    // konvaImage: null,
    position: null
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.selectedSprite.sprite.url
    image.onload = () => {
      // const konvaImage = new Konva.Image({
      //   image: image,
      //   x: 1,
      //   y: 1,
      //   width:60,
      //   height:60,
      // })
      this.setState({
        image: image,
        uniqueKey: this.props.selectedSprite.uniqueKey,
        // konvaImage: konvaImage
      });
    };

  }

  // componentDidUpdate() {
    // const image = new window.Image();
    // image.src = this.props.selectedSprite.sprite.url
    // image.onload = () => {
    //   this.setState({
    //     image: image
    //   });
    // };
  // }

  handleDragStart = (e) => {
    this.setState({
      isDragging: true
    })
    this.props.selectSprite(this.state.uniqueKey)
  }

  handleDragEnd = (e) => {
    let position = e.currentTarget.getClientRect()
    this.setState({
      isDragging: false,
      position: position
    })
    this.props.setSpritePosition(this.state.uniqueKey,position)
  }

  // handleHover = (e) => {
  //   this.setState({
  //     hover: true
  //   })
  //   // document.body.style.cursor = 'pointer'
  // }
  //
  // handleHoverOut = (e) => {
  //   this.setState({
  //     hover: false
  //   })
  //   // document.body.style.cursor = 'default'
  // }

  handleStroke = () => {
    if(this.props.djMode){
      return false
    }else{
      return this.props.selectedSprite.uniqueKey === this.state.uniqueKey ? true : false
    }
  }

  handleSelect = () => {
    if(!this.props.djMode){
      this.props.selectSprite(this.state.uniqueKey)
    }else{
      let playSprite = this.props.canvasSprites.find(sprite => sprite.uniqueKey === this.state.uniqueKey)
      if(document.getElementById(playSprite.uniqueKey)){
        let player = document.getElementById(playSprite.uniqueKey)
        player.paused ? player.play() : player.pause()
      }
    }
  }

  // onMouseOver={(e) => this.handleHover(e)}
  // onMouseOut={(e) => this.handleHoverOut(e)}
  render(){
    console.log('SPRITE PROPS', this.props)
    console.log('SPRITE STATE', this.state)

    return(
      <Image image={this.state.image}
          x={1}
          y={1}
          width={60}
          height={60}
          stroke='#000000'
          strokeWidth={3}
          onClick={this.handleSelect}
          onDragEnd={(e) => this.handleDragEnd(e)}
          onDragStart={(e) => this.handleDragStart(e)}
          draggable
          strokeEnabled={this.handleStroke()}
          />
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedSprite: state.sprite.selectedSprite,
    canvasSprites: state.sprite.canvasSprites,
    djMode: state.sound.djMode
  }
}

// function mapDispatchToProps(dispatch){
//   return {
//     selectSprite: (selectedSprite) => {
//       dispatch(selectSprite(selectedSprite))
//     }
//   }
// }

export default connect(mapStateToProps, actions)(Sprite);
