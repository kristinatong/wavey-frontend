// import React, { Component, Fragment } from 'react'
// import { connect } from 'react-redux';
// import ReactPlayer from 'react-player'
// import { PlayerIcon } from 'react-player-controls'
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import { colors } from '../App'
// import * as actions from '../actions/sound'
//
// class DJMode extends Component{
//
//   renderPlayers(){
//     this.props.canvasSprites.map(sprite => {
//       let x = document.createElement("AUDIO");
//       x.setAttribute("src",sprite.sound.url)
//       x.autoplay = true
//       document.body.appendChild(x)
//     })
//   }
//
//   render(){
//       return(
//         <Fragment>
//           {this.renderPlayers()}
//         </Fragment>
//       )
//     }
// }
//
// function mapStateToProps(state) {
//   return {
//     djMode: state.sound.djMode,
//     canvasSprites: state.sprite.canvasSprites
//   }
// }
//
// // function mapDispatchToProps(dispatch){
// //   return {
// //
// //   }
// // }
//
// export default connect(mapStateToProps, actions)(DJMode);
