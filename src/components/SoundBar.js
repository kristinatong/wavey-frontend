import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/sound';
// import { Stage, Layer, Text, Image } from 'react-konva';
// import { selectSound, setSounds } from '../actions/sound'

class SoundBar extends Component{
  componentDidMount(){
    fetch('http://localhost:3000/api/v1/sounds')
      .then(r => r.json())
      .then(sounds => {
        this.props.setSounds(sounds)
      })
  }

  selectSound = (sound) => {
    this.props.selectSound(sound, this.props.selectedSprite.uniqueKey)
  }

  renderSounds = () => {
    return this.props.sounds.map(sound => {
      return <li key={sound.id} onClick={() => this.selectSound(sound)}>{sound.name}</li>
    })
  }

  render(){
    console.log('sound bar props',this.props)
    const soundStyle = {
      position: 'absolute',
      right: '0',
      top: '10',
      width: '150px',
      height: '100vh',
      backgroundColor: '#EEEEEE',
      borderLeft: '1px dotted'}

    return(
      <div style={soundStyle}>
        <h1>Sound Bar</h1>
        <ul>
          {this.renderSounds()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sounds: state.sound.sounds,
    selectedSound: state.sound.selectedSound,
    selectedSprite: state.sprite.selectedSprite
  }
}

// function mapDispatchToProps(dispatch){
//   return {
//     selectSound: (sound,uniqueKey) => {
//       dispatch(selectSound(sound,uniqueKey))
//     }
//   }
// }

export default connect(mapStateToProps, actions)(SoundBar);
