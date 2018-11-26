import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import '../assets/css/App.css';
import SpriteBar from './SpriteBar'
import Canvas from './Canvas'
import SoundBar from './SoundBar'
import ControlBar from './ControlBar'
import Player from './Player'
import UploadSound from './UploadSound'
import withAuth from '../hocs/withAuth'

class Home extends Component {
  render() {
    return (
      <div id="row2">
        <SpriteBar />
        <Canvas />
        <SoundBar />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    // loggedIn: state.user.loggedIn
  }
}

// export default App;
export default withAuth(connect(mapStateToProps)(Home));
