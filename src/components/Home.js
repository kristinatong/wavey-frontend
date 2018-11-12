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
import LeftBar from './LeftBar'
import withAuth from '../hocs/withAuth'

class Home extends Component {
  render() {
    // return (
    //   <Fragment>
    //     <SpriteBar />
    //     <SoundBar />
    //     <ControlBar />
    //     <Canvas />
    //     <Player />
    //     <UploadSound />
    //   </Fragment>
    // )
    return (
      <div className="wrapper">
        <SpriteBar />
        <SoundBar />
        <Canvas />
        <Player />
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
