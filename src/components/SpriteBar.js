import React, { Component } from 'react'
import { connect } from 'react-redux';
// import Konva from 'konva';
// import { Stage, Layer, Image } from 'react-konva';

class SpriteBar extends Component{
  state = {
    selectedSprite: null
  }

  // onDragStart = (ev, id) => {
  //   ev.dataTransfer.setData("id", id);
  // }
  //
  // onDragOver = (ev) => {
  //   ev.preventDefault();
  // }

  // sprites = () => {
  //   const imgStyle={width:'100px', height:'100px'}
  //   return this.props.sprites.map(sprite => {
  //     return <img key={sprite.id} style={imgStyle} onDragStart = {(e) => this.onDragStart(e, sprite.url)}
  //       draggable src={sprite.url}/>
  //     })
  //   }

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

  addSprite = () => {
    if(!!this.state.selectedSprite){
      this.props.addSprite(this.state.selectedSprite)
      this.setState({selectedSprite: null})
    }
  }

  render(){
    console.log('spritebar state',this.state)
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
        <button onClick={this.addSprite}>Add Sprite</button>
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpriteBar);
