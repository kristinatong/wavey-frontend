import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/sound';
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
    // const soundStyle = {
    //   position: 'absolute',
    //   right: '0',
    //   top: '10',
    //   width: '150px',
    //   height: '100vh',
    //   backgroundColor: '#EEEEEE',
    //   borderLeft: '1px dotted'}
// <div className='bar soundbar'>
// <ul>
//   {this.renderSounds()}
// </ul>
    return(
      <div id='soundbar'>
        <div className="sidebar-nav">
          <FormControl className="filter">
          <InputLabel shrink htmlFor="age-label-placeholder">
              SOUNDS
            </InputLabel>
            <Select
              value={this.state.age}
              onChange={this.handleChange}
              input={<Input name="age" id="age-label-placeholder" />}
              displayEmpty
              name="age"
              className={styles.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value='all'>All</MenuItem>
              <MenuItem value='instruments'>Instruments</MenuItem>
              <MenuItem value='custom'>Custom</MenuItem>
            </Select>
          </FormControl>
        </div>
      <div id="sound-scroll">
      <List celled>
        <List.Item>
          <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
          <List.Content>
            <List.Header>Snickerdoodle</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
          <List.Content>
            <List.Header>Poodle</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
          <List.Content>
            <List.Header>Paulo</List.Header>
          </List.Content>
        </List.Item>
      </List>
      </div>
      <MuiThemeProvider theme={colors}>
      <Button onClick={this.addSpriteMethod} variant="contained" color="secondary">
      ADD
    </Button>
    </MuiThemeProvider>
    <br/>
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
