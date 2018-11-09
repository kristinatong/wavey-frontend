import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
// import Konva from 'konva';
// import { Stage, Layer, Image, Text } from 'react-konva';
// import { addSprite } from '../actions/sprite'
import * as actions from '../actions/sprite'
import UUID from 'uuid'
import { API_ENDPOINT } from '../adapters/index'

class SpriteBar extends Component{
  state = {
    selectedSpriteBar: null
  }

  componentDidMount(){
    fetch(`${API_ENDPOINT}/api/v1/sprites`)
      .then(r => r.json())
      .then(sprites => {
        this.props.setSprites(sprites)
      })
  }

  selectSprite = (sprite) => {
    this.setState({
      selectedSpriteBar: sprite
    })
  }

  sprites = () => {
    return this.props.sprites.map(sprite => {
      return (
        <Fragment key={sprite.id}>
          <img style={this.state.selectedSpriteBar === sprite ? {width:'100px', height:'100px', border:"5px solid red"} : {width:'100px', height:'100px'}} src={sprite.url} onClick={() => this.selectSprite(sprite)} alt={sprite.name} /><br/>
        </Fragment>
      )
      })
    }

    // sprites = () => {
    //   let y = -50
    //   const imgStyle={width:'100px', height:'100px'}
    //   return this.props.sprites.map(sprite => {
    //     const image = new window.Image();
    //     image.src = sprite.url
    //     y += 110
    //     return <Image key={sprite.id}
    //             image={image}
    //             onClick={() => this.selectSprite(sprite)}
    //             x={30}
    //             y={y}
    //             width={100}
    //             height={100}
    //             stroke='red'
    //             strokeWidth={5}
    //             strokeEnabled={this.state.selectedSpriteBar == sprite ? true : false}/>
    //     })
    //   }


  addSpriteMethod = () => {
    const uniqueKey = UUID()
    // if(this.props.selectedSprite){
    //   this.props.addSprite({...this.state.selectedSprite,uniqueKey:uniqueKey})
    //   this.setState({selectedSpriteBar: null})
    // }
    this.props.addSprite({sprite:this.state.selectedSpriteBar, uniqueKey: uniqueKey})
  }

  render(){
    const divStyle = {
      position: 'absolute',
      width: '150px',
      height: '100vh',
      left: '0',
      top: '10',
      backgroundColor: '#EEEEEE',
      borderRight: '1px dotted'}

    // const spriteBarStyle = {
    //   position: 'absolute',
    //   // width: '150px',
    //   // height: '100vh',
    //   left: '0',
    //   top: '10',
    //   backgroundColor: '#EEEEEE',
    //   borderRight: '1px dotted'}


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
      // <Stage style={spriteBarStyle} width={150} height={720}>
      //   <Layer>
      //     <Text text='Control Bar'/>
      //     {this.sprites()}
      //     <Rect
      //       x={20}
      //       y={50}
      //       width={100}
      //       height={100}
      //       fill="red"
      //       shadowBlur={10}
      //     />
      //   </Layer>
      // </Stage>
    )
  }
}

function mapStateToProps(state) {
  return {
    sprites: state.sprite.sprites,
    selectedSprite: state.sprite.selectedSprite
  }
}

// function mapDispatchToProps(dispatch){
//   return {
//     addSprite: (selectedSprite) => {
//       dispatch(addSprite(selectedSprite))
//     }
//   }
// }

export default connect(mapStateToProps, actions)(SpriteBar);
