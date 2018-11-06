import React, { Component } from 'react';
import '../assets/css/App.css';
import SpriteBar from './SpriteBar'
import Canvas from './Canvas'
import SoundBar from './SoundBar'
import ControlBar from './ControlBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SpriteBar />
        <SoundBar />
        <ControlBar />
        <Canvas />
      </div>
    );
  }
}

export default App;
