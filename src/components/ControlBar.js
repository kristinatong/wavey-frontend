import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Stage, Layer, Text, Image } from 'react-konva';
import Player from './Player'

class ControlBar extends Component{
  state = {
    ctrlImage: null,
    imageStatus: null,
    url: ""
  }

  componentDidUpdate() {
    const image = new window.Image();
    image.src = this.props.selectedSprite.sprite.url
    image.width = 100
    image.height = 100
    image.onload = () => {
      this.setState({
        ctrlImage: image
      });
    };
  }

  handleImageLoaded() {
    this.setState({ imageStatus: "loaded" });
  }

  handleImageErrored() {
    this.setState({ imageStatus: "failed to load" });
  }

  render(){
    return(
      <div id='controlbar'>
          <Stage className='control-canvas' width={200} height={100}>
            <Layer>
              <Image image={this.state.ctrlImage}
                  x={0}
                  y={0}
                  width={80}
                  height={80}
                  stroke='red'
                  strokeWidth={2}
                  strokeEnabled={false}/>
            </Layer>
          </Stage>
          <Player/>
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    selectedSprite: state.sprite.selectedSprite
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
