import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Stage, Layer, Text } from 'react-konva';
import Sprite from './Sprite'

class ControlBar extends Component{

  render(){
    console.log('control bar props',this.props)
    const controlStyle =  {
      position: 'absolute',
      backgroundColor: '#EEEEEE',
      bottom:'0px',
      left:'20%',
      border: '1px dotted'
    }

    return(
      <Stage style={controlStyle} width={600} height={120}>
        <Layer>
          <Sprite sprite={this.props.selectedSprite}/>
        </Layer>
      </Stage>
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
