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
  formControl: {
    // margin: theme.spacing.unit,
    // minWidth: 120,
    margin: 0,
    fullWidth: true,
    backgroundColor: '#9ee',
    display: 'flex',
    wrap: 'nowrap'
  }
});

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
          <img style={this.state.selectedSpriteBar === sprite ? {width:'50px', height:'50px', border:"5px solid red"} : {width:'50px', height:'50px'}} src={sprite.url} onClick={() => this.selectSprite(sprite)} alt={sprite.name} /><br/>
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
    // const divStyle = {
    //   position: 'absolute',
    //   width: '150px',
    //   height: '100vh',
    //   left: '0',
    //   top: '10',
    //   backgroundColor: '#EEEEEE',
    //   borderRight: '1px dotted'}

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
          // <div className="bar spritebar">
    // return(
    //
    //   <div id="spritebar">
    //     <div className="sprite-navbar">
    //       <FormControl className={styles.formControl}>
    //       <InputLabel htmlFor="age-simple">Images</InputLabel>
    //       <Select
    //         value={this.state.age}
    //         onChange={this.handleChange}
    //         inputProps={{
    //           name: 'age',
    //           id: 'age-simple',
    //         }}
    //       >
    //         <MenuItem value="">
    //           <em>None</em>
    //         </MenuItem>
    //         <MenuItem value={10}>Ten</MenuItem>
    //         <MenuItem value={20}>Twenty</MenuItem>
    //         <MenuItem value={30}>Thirty</MenuItem>
    //       </Select>
    //     </FormControl>
    //     </div>
    //     <h3>Sprites</h3>
    //     {this.sprites()}
    //     <button onClick={this.addSpriteMethod}>Add Sprite</button>
    //   </div>
    // )
    return(
      <div id='spritebar'>
      </div>
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
