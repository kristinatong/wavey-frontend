import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
// import * as actions from '../actions/actions';
// import Konva from 'konva';
// import { Stage, Layer, Image } from 'react-konva';
import Sprite from './Sprite'
// import UUID from 'uuid'

class SpriteList extends Component{

  renderSprites = () => {
    return this.props.canvasSprites.map(sprite => <Sprite key={sprite.uniqueKey} sprite={sprite}/>)
  }

  render(){
    console.log('sprite list props',this.props)

    return(
      <Fragment>
        {this.renderSprites()}
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedSprite: state.sprite.selectedSprite,
    canvasSprites: state.sprite.canvasSprites
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpriteList);
