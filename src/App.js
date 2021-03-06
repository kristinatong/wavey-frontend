import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
// import * as actions from '../actions/index';
import './assets/css/App.css';
// import SpriteBar from './components/SpriteBar'
// import Canvas from './components/Canvas'
// import SoundBar from './components/SoundBar'
// import ControlBar from './components/ControlBar'
// import Player from './components/Player'
// import UploadSound from './components/UploadSound'
import MenuAppBar from './components/MenuAppBar'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Profile from './components/Profile'
import UploadSound from './components/UploadSound'
import { createMuiTheme } from '@material-ui/core/styles';

class App extends Component {
  render() {
    console.log(this.props)
    return(
      <div className='vwrapper'>
        <MenuAppBar />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/upload" component={UploadSound} />
        </Switch>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn
  }
}

export const colors = createMuiTheme({
  palette: {
    primary: {
      main: '#fffbf1',
    },
    secondary: {
      light: 'fffbf1',
      main: '#000000', //dark
    }
  },
});
// export default App;
// export default connect(mapStateToProps)(App);
// export default withRouter(App) //withRouter is a Higher Order Component (HOC) that returns a COPY of App with React router props injected
export default withRouter(connect(mapStateToProps)(App))
