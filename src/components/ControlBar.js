import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Stage, Layer, Text, Image } from 'react-konva';
import Player from './Player'
import DJMode from './DJMode'
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { colors } from '../App'
import { changeDJMode } from '../actions/sound'
import { clearSelected } from '../actions/sprite'


class ControlBar extends Component{
  state = {
    ctrlImage: null,
    imageStatus: null,
    url: ""
  }

  componentDidUpdate() {
    if(Object.keys(this.props.selectedSprite).length != 0){
      const image = new window.Image();
      image.src = this.props.selectedSprite.sprite.url
      image.width = 100
      image.height = 100
      image.onload = () => {
        this.setState({
          ctrlImage: image
        });
      };
    }
  }

  handleImageLoaded() {
    this.setState({ imageStatus: "loaded" });
  }

  handleImageErrored() {
    this.setState({ imageStatus: "failed to load" });
  }

  handleDJ = (djMode) => {
    this.props.changeDJMode()
    this.props.clearSelected()
  }

  render(){
    console.log('control bar', this.props)
    return(
      <div id='controlbar'>
        {!this.props.djMode ? (<Fragment><Stage className='control-canvas' width={200} height={80}>
          <Layer>
            <Image image={Object.keys(this.props.selectedSprite).length === 0 ? null : this.state.ctrlImage}
                x={0}
                y={0}
                width={80}
                height={80}
                stroke='red'
                strokeWidth={2}
                strokeEnabled={false}/>
          </Layer>
        </Stage>
        <Player/></Fragment>
      ) : (
          <Fragment></Fragment>
        )}

        <MuiThemeProvider theme={colors}>
          <Button disabled={!this.props.canvasSprites.length > 0 ? true : false} onClick={() => this.handleDJ(this.props.djMode)} variant="contained" color="secondary">
          DJ MODE
          </Button>
        </MuiThemeProvider>

      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    selectedSprite: state.sprite.selectedSprite,
    djMode: state.sound.djMode,
    canvasSprites: state.sprite.canvasSprites
  }
}

// function mapDispatchToProps(dispatch){
//   return {
//
//   }
// }

export default connect(mapStateToProps, { changeDJMode, clearSelected })(ControlBar);
