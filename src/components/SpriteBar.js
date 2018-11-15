import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
// import Konva from 'konva';
// import { Stage, Layer, Image, Text } from 'react-konva';
// import { addSprite } from '../actions/sprite'
import * as actions from '../actions/sprite'
import UUID from 'uuid'
import { API_ENDPOINT } from '../adapters/index'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import {List, ListItem} from 'material-ui/List';
// import {Paper} from 'material-ui/Paper'
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { colors } from '../App'
// import { Icon, Popup } from 'semantic-ui-react'

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
  }
});

class SpriteBar extends Component{
  state = {
    selectedSpriteBar: null,
    filterBy: 'all',
    hover: false
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

  hover = () =>{
    this.setState({
      hover: !this.state.hover
    })
  }

  sprites = () => {
    let sprites;
    if(this.state.filterBy === 'all'){
      sprites = this.props.sprites
    }else{
      sprites = this.props.sprites.filter(sprite => sprite.sprite_type === this.state.filterBy)
    }
    return sprites.map(sprite => {
      return (
        <Fragment key={sprite.id}>
          <img className={this.state.hover ? 'hover01-hover' : 'hover01'} onHover={this.hover} style={this.state.selectedSpriteBar === sprite ? {width:'60px', height:'60px', border:"3px solid black"} : {width:'60px', height:'60px'}} src={sprite.url} onClick={() => this.selectSprite(sprite)} alt={sprite.name} /><br/>
        </Fragment>
      )
      })
    }

    getSpriteTypes = () => {
      return (
        ['all',...new Set(this.props.sprites.map(item => item.sprite_type))].map(type => {
          return <MenuItem value={type}>{type.toUpperCase()}</MenuItem>
        })
      )
    }

    filterSprites = (e) => {
      this.setState({
        filterBy: e.target.value
      })
    }

  addSpriteMethod = () => {
    const uniqueKey = UUID()
    this.props.addSprite({sprite:this.state.selectedSpriteBar, uniqueKey: uniqueKey})
  }

  render(){
    console.log(this.props.sprites)
    return(
      <div id="spritebar">
        <div className="sidebar-nav">
        <FormControl className="filter">
        <InputLabel shrink htmlFor="filterBy">
            IMAGES
          </InputLabel>
          <Select
            value={this.state.filterBy}
            onChange={this.filterSprites}
            input={<Input name="filterBy" id="filterBy" />}
            displayEmpty
            name="age"
          >
            {this.getSpriteTypes()}
          </Select>
      </FormControl>
        </div>
        <div id='sprite-scroll'>
        {this.sprites()}
        </div>
        <MuiThemeProvider theme={colors}>
        <Button disabled={this.props.djMode ? true : false} onClick={this.addSpriteMethod} variant="contained" color="secondary">
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
    sprites: state.sprite.sprites,
    selectedSprite: state.sprite.selectedSprite,
    djMode: state.sound.djMode
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
