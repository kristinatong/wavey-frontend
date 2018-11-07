import React, { Component } from 'react'
import { connect } from 'react-redux';
// import Konva from 'konva';
// import { Stage, Layer, Image } from 'react-konva';
import { addSprite } from '../actions/sprite'
import UUID from 'uuid'

class SpriteBar extends Component{
  state = {
    selectedSprite: null
  }

  selectSprite = (sprite) => {
    this.setState({
      selectedSprite: sprite
    })
  }

  sprites = () => {
    const imgStyle={width:'100px', height:'100px'}
    return this.props.sprites.map(sprite => {
      return <img key={sprite.id} style={imgStyle} src={sprite.url} onClick={() => this.selectSprite(sprite)} alt={sprite.name} />
      })
    }

  addSpriteMethod = () => {
    const uniqueKey = UUID()
    if(!!this.state.selectedSprite){
      this.props.addSprite({...this.state.selectedSprite,uniqueKey:uniqueKey})
      this.setState({selectedSprite: null})
    }
  }

  render(){
    console.log('spritebar state',this.state)
    console.log('spritebar props',this.props)
    const divStyle = {
      position: 'absolute',
      width: '150px',
      height: '100vh',
      left: '0',
      top: '10',
      backgroundColor: '#EEEEEE',
      borderRight: '1px dotted'}

    // return(
    //   <div style={divStyle} onDragOver={(e)=>this.onDragOver(e)}
    //     onDrop={(e)=>{this.onDrop(e, "wip")}}>
    //     <h1>Sprite Bar</h1>
    //     {this.sprites()}
    //     <button onClick={this.props.addSprite}>Add Sprite</button>
    //   </div>
    // )
    return(
      <div style={divStyle}>
        <h1>Sprite Bar</h1>
        {this.sprites()}
        <button onClick={this.addSpriteMethod}>Add Sprite</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sprites: state.sprite.sprites
  }
}

function mapDispatchToProps(dispatch){
  return {
    addSprite: (selectedSprite) => {
      dispatch(addSprite(selectedSprite))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpriteBar);
