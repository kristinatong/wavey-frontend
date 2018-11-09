import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
// import * as actions from '../actions/index';
import '../assets/css/App.css';
import SpriteBar from './SpriteBar'
import Canvas from './Canvas'
import SoundBar from './SoundBar'
import ControlBar from './ControlBar'
import Player from './Player'
import UploadSound from './UploadSound'

class Home extends Component {
  render() {
    console.log(this.props)
    return (
      <Fragment>
        <SpriteBar />
        <SoundBar />
        <ControlBar />
        <Canvas />
        <Player />
        <UploadSound />
      </Fragment>
    );
  }

}

function mapStateToProps(state) {
  return {
    state: state
  }
}

// export default App;
export default connect(mapStateToProps)(Home);
