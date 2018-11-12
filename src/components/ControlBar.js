import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Stage, Layer, Text, Image } from 'react-konva';
// import Sprite from './Sprite'

class ControlBar extends Component{
  state = {
    ctrlImage: null,
    imageStatus: null,
    url: ""
  }

  componentDidUpdate() {
    const image = new window.Image();
    image.src = this.props.selectedSprite.sprite.url
    image.width = 100
    image.height = 100
    image.onload = () => {
      this.setState({
        ctrlImage: image
      });
    };
    // if(!Object.keys(this.props.selectedSprite === 0)){
    //   this.setState({
    //     url: this.props.selectedSprite.sprite.url
    //   })
    // }
  }

  handleImageLoaded() {
    this.setState({ imageStatus: "loaded" });
  }

  handleImageErrored() {
    this.setState({ imageStatus: "failed to load" });
  }

  render(){
    console.log(this.state)
    // const controlStyle =  {
    //   // position: 'absolute',
    //   backgroundColor: 'darkgray',
    //   // bottom:'0px',
    //   // left:'20%',
    //   // border: '1px dotted'
    //   alignSelf: 'flex-end'
    // }

    // width={600} height={120}

    // return(
    //   <div id="controlbar">
    //     Control Bar
    //     <Stage className='control-canvas' width={400} height={100}>
    //       <Layer>
    //         <Text text='Control Bar'/>
    //         <Image image={this.state.ctrlImage}
    //             x={100}
    //             y={0}
    //             width={90}
    //             height={90}/>
    //       </Layer>
    //     </Stage>
    //   </div>
    // )
    return(
      <div id='controlbar'>
          <Stage className='control-canvas' width={400} height={100}>
            <Layer>
              <Text text='Control Bar'/>
              <Image image={this.state.ctrlImage}
                  x={100}
                  y={0}
                  width={90}
                  height={90}/>
            </Layer>
          </Stage>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedSprite: state.sprite.selectedSprite
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
