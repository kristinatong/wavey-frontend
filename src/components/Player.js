import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'

class Player extends Component{

  render(){
    console.log('PLAYER PROPS',this.props)
    const playerStyle =  {
      position: 'absolute',
      bottom:'30px',
      left:'40%',
      border: '1px dotted'
    }

    if(this.props.selectedSprite.sound){
      return(
          <ReactPlayer style={playerStyle} width={300} height={50} url={this.props.selectedSprite.sound.url} playing controls={true}/>
      )
    }else{
      return null
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);
