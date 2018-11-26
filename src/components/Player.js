import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'
import { PlayerIcon } from 'react-player-controls'
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

  // // componentDidMount(){
  // //   var music = document.getElementById('music'); // id for audio element
  // //   var duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
  // //   var pButton = document.getElementById('pButton'); // play button
  // //   var playhead = document.getElementById('playhead'); // playhead
  // //   var timeline = document.getElementById('timeline'); // timeline
  // //
  // //   // timeline width adjusted for playhead
  // //   var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
  // //
  // //   // timeupdate event listener
  // //   music.addEventListener("timeupdate", timeUpdate, false);
  // //
  // //   // makes timeline clickable
  // //   timeline.addEventListener("click", function(event) {
  // //       moveplayhead(event);
  // //       music.currentTime = duration * clickPercent(event);
  // //   }, false);
  // //
  // //   // returns click as decimal (.77) of the total timelineWidth
  // //   function clickPercent(event) {
  // //       return (event.clientX - getPosition(timeline)) / timelineWidth;
  // //   }
  // //
  // //   // makes playhead draggable
  // //   playhead.addEventListener('mousedown', mouseDown, false);
  // //   window.addEventListener('mouseup', mouseUp, false);
  // //
  // //   // Boolean value so that audio position is updated only when the playhead is released
  // //   var onplayhead = false;
  // //
  // //   // mouseDown EventListener
  // //   function mouseDown() {
  // //       onplayhead = true;
  // //       window.addEventListener('mousemove', moveplayhead, true);
  // //       music.removeEventListener('timeupdate', timeUpdate, false);
  // //   }
  // //
  // //   // mouseUp EventListener
  // //   // getting input from all mouse clicks
  // //   function mouseUp(event) {
  // //       if (onplayhead == true) {
  // //           moveplayhead(event);
  // //           window.removeEventListener('mousemove', moveplayhead, true);
  // //           // change current time
  // //           music.currentTime = duration * clickPercent(event);
  // //           music.addEventListener('timeupdate', timeUpdate, false);
  // //       }
  // //       onplayhead = false;
  // //   }
  // //   // mousemove EventListener
  // //   // Moves playhead as user drags
  // //   function moveplayhead(event) {
  // //       var newMargLeft = event.clientX - getPosition(timeline);
  // //
  // //       if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
  // //           playhead.style.marginLeft = newMargLeft + "px";
  // //       }
  // //       if (newMargLeft < 0) {
  // //           playhead.style.marginLeft = "0px";
  // //       }
  // //       if (newMargLeft > timelineWidth) {
  // //           playhead.style.marginLeft = timelineWidth + "px";
  // //       }
  // //   }
  // //
  // //   // timeUpdate
  // //   // Synchronizes playhead position with current point in audio
  // //   function timeUpdate() {
  // //       var playPercent = timelineWidth * (music.currentTime / duration);
  // //       playhead.style.marginLeft = playPercent + "px";
  // //       if (music.currentTime == duration) {
  // //           pButton.className = "";
  // //           pButton.className = "play";
  // //       }
  // //   }
  // //
  // //
  // //   // Gets audio file duration
  // //   music.addEventListener("canplaythrough", function() {
  // //       duration = music.duration;
  // //   }, false);
  // //
  // //   // getPosition
  // //   // Returns elements left position relative to top-left of viewport
  // //   function getPosition(el) {
  // //       return el.getBoundingClientRect().left;
  // //   }
  // // }
  //
  // //Play and Pause
  // play=()=>{
  //   this.setState({
  //     paused: !this.state.paused
  //   })
  // }

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



      // return(
      //   <div className="player">
      //   <audio id="music" playing={this.props.djMode ? false : true} preload="true" loop={this.state.loop}>
      //     <source src={url}/>
      //     </audio>
      //     <div id="audioplayer">
      //     <button id="pButton" onClick={this.play} class={this.state.paused ? 'pause' : 'play'}></button>
      //     <div id="timeline">
      //           <div id="playhead"></div>
      //     </div>
      //     </div>
      //     <MuiThemeProvider theme={colors}>
      //     {!this.props.djMode ?
      //     (
      //     <FormControlLabel
      //     disabled={!this.props.selectedSprite.sound ? true : false}
      //     control={
      //       <Checkbox
      //         checked={this.state.loop}
      //         value={this.state.loop}
      //         onChange={this.handleChange}
      //         color="primary"
      //       />
      //     }
      //     label="LOOP"
      //   />) : null}
      //   </MuiThemeProvider>
      //   </div>
      // )
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
