import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { colors } from '../App'
import * as actions from '../actions/sound'


class Player extends Component{
  state = {
    loop: false,
    paused: false
  }

  handleChange = () => {
    this.setState({
      loop: !this.state.loop
    })
    this.props.loopSound()
  }

  render(){
    console.log('PLAYER PROPS',this.props)
    console.log('PLAYER STATE', this.state)
    let url;
    if(this.props.selectedSprite.sound){
      url = this.props.selectedSprite.sound.url
      // loop = this.props.selectedSprite.sound.loop
    }else{
      url = "test.mp3"
    }
      return(
        <div className="player">
          <ReactPlayer className="react-player" width={275} height={60} url={url} playing={this.props.djMode || this.props.playPreview ? false : true} controls={this.props.djMode ? false : true} loop={this.state.loop}/><br/>
          <MuiThemeProvider theme={colors}>
          {!this.props.djMode ?
          (
          <FormControlLabel
          disabled={!this.props.selectedSprite.sound ? true : false}
          control={
            <Checkbox
              checked={this.state.loop}
              value={this.state.loop}
              onChange={this.handleChange}
              color="primary"
            />
          }
          label="LOOP"
        />) : null}
        </MuiThemeProvider>
        </div>
      )
    }
}

function mapStateToProps(state) {
  return {
    selectedSprite: state.sprite.selectedSprite,
    djMode: state.sound.djMode,
    playPreview: state.sprite.playPreview
  }
}

// function mapDispatchToProps(dispatch){
//   return {
//
//   }
// }

export default connect(mapStateToProps, actions)(Player);
