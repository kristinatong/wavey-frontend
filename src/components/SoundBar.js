import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/sound';
// import { Stage, Layer, Text, Image } from 'react-konva';
// import { selectSound, setSounds } from '../actions/sound'
import { API_ENDPOINT } from '../adapters/index'

class SoundBar extends Component{
  state = {
    selectedSoundBar: null,
    filterSounds: []
  }

  componentDidMount(){
    fetch(`${API_ENDPOINT}/api/v1/sounds`)
      .then(r => r.json())
      .then(sounds => {
        this.props.setSounds(sounds)
      })
  }

  selectSound = (sound) => {
    fetch(`${API_ENDPOINT}/api/v1/sounds/${sound.id}`)
      .then(r => r.json())
      .then(data => {
        // url: data.url
        this.props.selectSound(sound, this.props.selectedSprite.uniqueKey, data.url)
      })
    this.setState({
      selectedSoundBar: sound
    })
    // this.props.selectSound(sound, this.props.selectedSprite.uniqueKey)
  }

  renderSounds = () => {
    return this.props.sounds.map(sound => {
      return <li key={sound.id} style={this.state.selectedSoundBar === sound ? {border:"1px solid red"} : null} onClick={() => this.selectSound(sound)}>{sound.name}</li>
    })
  }

  render(){
    const soundStyle = {
      position: 'absolute',
      right: '0',
      top: '10',
      width: '150px',
      height: '100vh',
      backgroundColor: '#EEEEEE',
      borderLeft: '1px dotted'}

    return(
      <div className='bar soundbar'>
        <div className="sprite-navbar">
          All
        </div>
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
