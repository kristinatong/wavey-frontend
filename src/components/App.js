import React, { Component } from 'react';
import '../assets/css/App.css';
import SpriteBar from './SpriteBar'
import Canvas from './Canvas'
import SoundBar from './SoundBar'
import ControlBar from './ControlBar'
import Player from './Player'
import UploadSound from './UploadSound'

class App extends Component {
  render() {
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

export default App;
