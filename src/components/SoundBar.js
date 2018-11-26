import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/index';
// import { Stage, Layer, Text, Image } from 'react-konva';
// import { selectSound, setSounds } from '../actions/sound'
import { API_ENDPOINT } from '../adapters/index'
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { colors } from '../App'
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { Image, List } from 'semantic-ui-react'
import ReactPlayer from 'react-player'


const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  list:{
    width: '10%',
    height: '10%'
  }
  // formControl: {
  //   minWidth: 120,
  //   margin: 0,
  //   fullWidth: true,
  //   backgroundColor: '#9ee',
  //   display: 'flex',
  //   wrap: 'nowrap'
  // }
});

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
