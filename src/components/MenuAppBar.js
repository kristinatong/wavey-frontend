import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { connect } from 'react-redux'
// import withAuth from '../hocs/withAuth'
import { Redirect } from 'react-router-dom'
import * as userActions from '../actions/user'
import { MuiThemeProvider } from '@material-ui/core/styles';
import { colors } from '../App'

// const muiTheme = getMuiTheme({
//   palette: {
//     textColor: 'red',
//   },
//   appBar: {
//     height: 50,
//   },
// });

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
//The material design specification changed concerning variant names and styles.
//To allow a smooth transition we kept old variants and restyled variants for
//backwards compatibility but we log deprecation warnings. We will remove the
//old typography variants in the next major release v4.0.0 (Q1 2019).

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  state = {
    // auth: true,
    anchorEl: null,
    redirect: false,
    mainMenu: null,
  };

  // handleChange = event => {
  //   this.setState({ auth: event.target.checked });
  // };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMainMenu = event => {
    this.setState({ mainMenu: event.currentTarget });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      redirect: false
    });
  };

  handleMainClose = () => {
    this.setState({
      mainMenu: null,
      redirect: false
    });
  };

  logOut = () => {
    this.setState({
      anchorEl: null,
      redirect: '/'
    });
    this.props.logOut()
  }

  profile = () => {
    this.setState({
      anchorEl: null,
      redirect: '/profile'
    });
  }

  home = () => {
    this.setState({
      mainMenu: null,
      redirect: '/home'
    });
  }

  upload = () => {
    this.setState({
      mainMenu: null,
      redirect: '/upload'
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
  }

  render() {
    const { classes } = this.props;
    // const { auth, anchorEl } = this.state;
    const open = Boolean(this.state.anchorEl);
    const openMain = Boolean(this.state.mainMenu);
    console.log('menu app bar',this.state)
    return (
      <div id='app-bar'>
        {this.renderRedirect()}
        <MuiThemeProvider theme={colors}>
        <AppBar color='secondary' position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon aria-owns={openMain ? 'main-menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMainMenu}
              color="inherit"/>
              <Menu
                id="main-menu-appbar"
                anchorEl={this.state.mainMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openMain}
                onClose={this.handleMainClose}
              >
                <MenuItem onClick={this.home}>Home</MenuItem>
                <MenuItem onClick={this.upload}>Upload Sound</MenuItem>
              </Menu>
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            <img src="https://fontmeme.com/permalink/181115/1e41bfd7268771abab0dae20b204c730.png" alt="graffiti-fonts" border="0"/>
            </Typography>
            {this.props.loggedIn && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.profile}>Profile</MenuItem>
                  <MenuItem onClick={this.logOut}>Log Out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        </MuiThemeProvider>
      </div>
    );

    // return(
    //   <div id='row1'>
    //     this is the header
    //   </div>
    // )
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn
  }
}

// export default withStyles(styles)(MenuAppBar);

const connectedToReduxHOC = connect(mapStateToProps, userActions)
const connectedMenu = connectedToReduxHOC(MenuAppBar)
const withStylesMenu = withStyles(styles)(connectedMenu)
export default withStylesMenu
