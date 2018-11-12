import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Stage, Layer, Text, Image } from 'react-konva';
// import Sprite from './Sprite'

class ControlBar extends Component{
  state = {
    ctrlImage: null
  }

  componentDidUpdate() {
    const image = new window.Image();
    image.src = this.props.selectedSprite.sprite.url
    image.onload = () => {
      this.setState({
        ctrlImage: image
      });
    };
  }

  render(){
    const controlStyle =  {
      // position: 'absolute',
      backgroundColor: 'darkgray',
      // bottom:'0px',
      // left:'20%',
      // border: '1px dotted'
    }

    return(
      <div className="footer">
      <Stage style={controlStyle} width={600} height={120}>
        <Layer>
          <Text text='Control Bar'/>
          <Image image={this.state.ctrlImage}
              x={50}
              y={10}
              width={100}
              height={100}/>
        </Layer>
      </Stage>
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
