import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/css/App.css';
import SpriteBar from './SpriteBar'
import Canvas from './Canvas'
import SoundBar from './SoundBar'
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
