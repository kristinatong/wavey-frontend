import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setSounds } from '../actions/sound'
import { Button, Message, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { colors } from '../App'
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { withRouter, Redirect } from 'react-router'


const soundTypes = [{id:1, name: 'guitar'}, {id:2, name: 'drums'}, {id:3, name: 'piano'}]

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
    backgroundColor: 'black'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class UploadSound extends Component{
  state = {
    name: "",
    file: null,
    imageUrl: "",
    soundType: "",
    uploaded: false,
    failedUpload: false,
    error: ""
  };

  // renderTypes = () => {
  //   return soundTypes.map(sound => {
  //     return (<Fragment key={sound.id}><input type="radio" id={sound.name} name="soundType" value={sound.name} onChange={this.handleChange}/><label>{sound.name}</label><br/></Fragment>)
  //   })
  // }

  renderTypes = () => {
    return soundTypes.map(sound => <FormControlLabel kaye={sound.id} name={sound.name} value={sound.name} control={<Radio />} label={sound.name} />)
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    data.append("name", this.state.name);
    data.append("file", this.state.file);
    data.append("sound_type", this.state.soundType)
    data.append("image_url", this.state.imageUrl)
    fetch("http://localhost:3000/api/v1/sounds", {
      method: "POST",
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        if(data.status !== 500){
          this.props.setSounds(data)
          this.setState({
            uploaded: true
          })
        }else{
          this.setState({
            failedUpload: true
          })
        }
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFileUpload = event => {
    console.log(event.nativeEvent, event.target.files, event.target.files[0]);
    this.setState({
      file: event.target.files[0],
    });
  };

  // <form onSubmit={this.handleSubmit}>
  //   Name: <input
  //     name="name"
  //     type="text"
  //     value={this.state.name}
  //     onChange={this.handleChange}
  //   />
  //
  //   Type: {this.renderTypes()}
  //   <input type="file" onChange={this.handleFileUpload} />
  //   <input type="submit" value="Upload" />
  // </form>
  //
  // {this.state.imageURL ? (
  //   <img src={this.state.imageURL} alt="img" />
  // ) : null}
  //

              //
              // <FormControl component="fieldset">
              //   <FormLabel component="legend">Sound Type</FormLabel>
              //   <RadioGroup
              //     aria-label="Type"
              //     name="soundType"
              //     value={this.state.soundType}
              //     onChange={this.handleChange}
              //   >
              //     {this.renderTypes()}
              //   </RadioGroup>
              // </FormControl>
  render(){
    const { classes } = this.props;
    console.log('upload sound state', this.state)
    return !this.props.loggedIn ? (
      <Redirect to="/login" />
    ) : (
        <MuiThemeProvider theme={colors}>
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar} >
            <Icon name="music" color="main"/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Upload Sound
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            {this.state.uploaded ? <Message positive header="You have successfully uploaded a sound." /> : null}
            {this.state.failedUpload ? <Message error header="We are having issues uploading your sound. Please try again." /> : null}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Sound Name</InputLabel>
              <Input id="name" name="name" autoComplete="name" autoFocus onChange={this.handleChange} value={this.state.name}/>
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="soundType">Sound Type</InputLabel>
              <Input id="soundType" name="soundType" autoComplete="soundType" autoFocus onChange={this.handleChange} value={this.state.soundType}/>
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="imageUrl">Image URL</InputLabel>
              <Input id="imageUrl" name="imageUrl" autoComplete="imageUrl" autoFocus onChange={this.handleChange} value={this.state.imageUrl}/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <FormLabel>Sound File</FormLabel>
              <Input id="file" type="file" name="file" autoComplete="file" autoFocus onChange={this.handleFileUpload} />
            </FormControl>
            <br/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
            >
              Upload
            </Button>
          </form>
        </Paper>
      </main>
      </MuiThemeProvider>
    );
  }
}

UploadSound.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    sounds: state.sound.sounds,
    loggedIn: state.user.loggedIn
  }
}
//
// function mapDispatchToProps(dispatch){
//   return {
//
//   }
// }
//

// export default connect(mapStateToProps, { setSounds })(UploadSound);

const connectedToReduxHOC = connect(mapStateToProps, { setSounds })
const connectedMenu = connectedToReduxHOC(UploadSound)
const withStylesMenu = withStyles(styles)(connectedMenu)
export default withStylesMenu
