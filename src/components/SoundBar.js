import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { API_ENDPOINT } from '../adapters/index'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { colors } from '../App'
import { Image, List } from 'semantic-ui-react'
import ReactPlayer from 'react-player'

class SoundBar extends Component{
  state = {
    selectedSoundBar: null,
    filterBy: 'all',
    preview: ""
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
        this.setState({
          selectedSoundBar: sound,
          preview: data.url
        })
        this.props.playPreviewFunc()
      })
    // this.setState({
    //   selectedSoundBar: sound
    // })
  }


  handleAttach = () => {
    debugger
    if(!Object.keys(this.props.selectedSprite).length == 0){
      fetch(`${API_ENDPOINT}/api/v1/sounds/${this.state.selectedSoundBar.id}`)
        .then(r => r.json())
        .then(data => {
          this.props.selectSound(this.state.selectedSoundBar, this.props.selectedSprite.uniqueKey, data.url, false)
          this.setState({
            playPreview: false
          })
        })
    }else{
      alert ("Please select an image.");
    }
  }

  sounds = () => {
    let sounds;
    if(this.state.filterBy === 'all'){
      sounds = this.props.sounds
    }else{
      sounds = this.props.sounds.filter(sound => sound.sound_type === this.state.filterBy)
    }
    return sounds.map(sound => {
      return (
        <List.Item key={sound.id} className={this.state.selectedSoundBar === sound ? 'list-item' : 'list-item'} onClick={() => this.selectSound(sound)}>
          <Image avatar src={sound.image_url} />
          <List.Content>
            <List.Header>{sound.name}</List.Header>
          </List.Content>
        </List.Item>
      )
    })
  }

    getSoundTypes = () => {
      return (
        ['all',...new Set(this.props.sounds.map(item => item.sound_type))].map(type => {
          return <MenuItem key={type} value={type}>{type.toUpperCase()}</MenuItem>
        })
      )
    }

    filterSounds = (e) => {
      this.setState({
        filterBy: e.target.value
      })
    }

  render(){
    console.log(this.state)
    console.log(this.props)
    return(
      <div id='soundbar'>
        <div className="sidebar-nav">
        <FormControl className="filter">
        <InputLabel shrink htmlFor="age-label-placeholder">
            SOUNDS
          </InputLabel>
          <Select
            value={this.state.filterBy}
            onChange={this.filterSounds}
            input={<Input name="filterBy" id="age-label-placeholder" />}
            displayEmpty
            name="age"
          >
            {this.getSoundTypes()}
          </Select>
      </FormControl>
        </div>
      <div id="sound-scroll">
      <List celled>
        {this.sounds()}
      </List>
      </div>
      <MuiThemeProvider theme={colors}>
      <Button disabled={this.props.djMode || !this.state.selectedSoundBar ? true : false} onClick={this.handleAttach} variant="contained" color="secondary">
      ATTACH
    </Button>
    </MuiThemeProvider>
    <ReactPlayer width={0} height={0} controls={false} url={this.state.preview} playing={this.props.playPreview}/>
    <br/>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sounds: state.sound.sounds,
    selectedSprite: state.sprite.selectedSprite,
    djMode: state.sound.djMode,
    playPreview: state.sprite.playPreview
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
