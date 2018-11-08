import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions/index';
import '../assets/css/App.css';
import SpriteBar from './SpriteBar'
import Canvas from './Canvas'
import SoundBar from './SoundBar'
import ControlBar from './ControlBar'
import Player from './Player'
import UploadSound from './UploadSound'

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <SpriteBar />
        <SoundBar />
        <ControlBar />
        <Canvas />
        <Player />
        <UploadSound />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    state: state
  }
}

// export default App;
export default connect(mapStateToProps)(App);
