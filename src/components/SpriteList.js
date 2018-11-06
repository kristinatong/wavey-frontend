import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
// import * as actions from '../actions/actions';
// import Konva from 'konva';
// import { Stage, Layer, Image } from 'react-konva';
import Sprite from './Sprite'

class SpriteList extends Component{
  state = {

  }

  renderSprites = () => {
    return this.props.canvasSprites.map(sprite => <Sprite key={sprite.id} sprite={sprite}/>)
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

  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpriteList);
