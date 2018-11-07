import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'

class Player extends Component{
  state = {

  }

  render(){
    console.log('SOUND PROPS', this.props)
    const playerStyle =  {
      position: 'absolute',
      bottom:'30px',
      left:'40%',
      border: '1px dotted'
    }
    if(this.props.selectedSprite.selectedSound){
      return(
        <Fragment>
          <ReactPlayer style={playerStyle} width={300} height={50} url={this.props.selectedSprite.selectedSound.url} playing controls={true}/>
          <ReactPlayer url='' playing />
        </Fragment>
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
