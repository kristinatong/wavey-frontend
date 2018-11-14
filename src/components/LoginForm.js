import React from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { withRouter, Redirect } from 'react-router'
import { loginUser } from '../actions/user'
import { Button, Form, Segment, Message } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { colors } from '../App'
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    // margin: theme.spacing.unit,
    // backgroundColor: theme.palette.secondary.main,
    backgroundColor: '#915c75'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class LoginForm extends React.Component {
  state = { email: '', password: '' }

  // handleChange = (e, { name, value }) => {
  //   this.setState({ [name]: value })
  // }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  // handleChange = (e, semanticInputData) => {
  //   // semanticInputData.name -> 'email'
  //   this.setState({ [semanticInputData.name]: semanticInputData.value })
  // }

  handleLoginSubmit = (e) => { //semantic forms preventDefault for you
    e.preventDefault()
    console.log(this.state)
    this.props.loginUser(this.state.email, this.state.password) //comes from mapDispatchToProps
    this.setState({ email: '', password: '' }) //reset form to initial state
  }

  render() {
    const { classes } = this.props;
    console.log('%c PROPS IN LOGINFORM ', 'color: goldenrod', this.props)
    // return this.props.loggedIn ? (
    //   <Redirect to="/home" />
    // ) : (
    //   <Segment>
    //     <Form
    //       onSubmit={this.handleLoginSubmit}
    //       size="mini"
    //       key="mini"
    //       loading={this.props.authenticatingUser}
    //       error={this.props.failedLogin}
    //     >
    //       <Message error header={this.props.failedLogin ? this.props.error : null} />
    //       <Form.Group widths="equal">
    //         <Form.Input
    //           label="email"
    //           placeholder="email"
    //           name="email"
    //           onChange={this.handleChange}
    //           value={this.state.email}
    //         />
    //         <Form.Input
    //           type="password"
    //           label="password"
    //           placeholder="password"
    //           name="password"
    //           onChange={this.handleChange}
    //           value={this.state.password}
    //         />
    //       </Form.Group>
    //       <Button type="submit">Login</Button>
    //     </Form>
    //   </Segment>
    // )

    return this.props.loggedIn ? (
      <Redirect to="/home" />
    ) : (
      <MuiThemeProvider theme={colors}>
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar} >
          <LockIcon color="secondary"/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={this.handleLoginSubmit} loading={this.props.authenticatingUser} error={this.props.failedLogin}>
          {this.props.failedLogin ? <Message error header={this.props.error} /> : null}
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange} value={this.state.email}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" onChange={this.handleChange} value={this.state.password} />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </main>
    </MuiThemeProvider>
  )
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};


// const mapStateToProps = (reduxStoreState) => {
//   return {
//     authenticatingUser: reduxStoreState.usersReducer.authenticatingUser,
//     failedLogin: reduxStoreState.usersReducer.failedLogin,
//     error: reduxStoreState.usersReducer.error,
//     loggedIn: reduxStoreState.usersReducer.loggedIn
//   }
// }

// which pieces of the reduxStoreState does this component care about????
// const mapStateToProps = ({usersReducer: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
//   authenticatingUser,
//   failedLogin,
//   error,
//   loggedIn
// })

const mapStateToProps = (state) => {
  return {
    authenticatingUser: state.user.authenticatingUser,
    failedLogin: state.user.failedLogin,
    error: state.user.error,
    loggedIn: state.user.loggedIn
  }
}

// gives my component props (callback fns) that allow it to dispatch (SEND) actions to redux. these actions are then handled by my reducers
// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginUser: (email, password) => dispatch(loginUser(email, password))
//   }
// }

// const connectedToReduxHOC = connect(mapStateToProps, mapDispatchToProps)
// const connectedToReduxLoginForm = connectedToReduxHOC(LoginForm)
// const connectedToReduxHOCWithRouterLoginForm = withRouter(connectedToReduxLoginForm)
//
// export default connectedToReduxHOCWithRouterLoginForm


// export default withRouter(connect(mapStateToProps, { loginUser })(LoginForm))

const connectedToReduxHOC = connect(mapStateToProps, { loginUser })
const connectedMenu = connectedToReduxHOC(LoginForm)
const withStylesMenu = withStyles(styles)(connectedMenu)
export default withStylesMenu
