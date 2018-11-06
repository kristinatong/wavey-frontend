import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

class SoundBar extends Component{

  render(){
    const divStyle = {
      position: 'absolute',
      width: '150px',
      height: '100vh',
      right: '0',
      top: '10',
      backgroundColor: '#EEEEEE',
      borderLeft: '1px dotted'}

    return(
      <div style={divStyle} onDragOver={(e)=>this.onDragOver(e)}
        onDrop={(e)=>this.onDrop(e, "complete")}>
        <h1>Sound Bar</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps, actions)(SoundBar);
