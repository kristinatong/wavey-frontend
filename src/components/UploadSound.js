import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { setSounds } from '../actions/sound'

const soundTypes = [{id:1, name: 'guitar'}, {id:2, name: 'drums'}, {id:3, name: 'piano'}]

class UploadSound extends Component{
  state = {
    name: "",
    file: null,
    url: null,
    soundType: ""
  };

  renderTypes = () => {
    return soundTypes.map(sound => {
      return (<Fragment key={sound.id}><input type="radio" id={sound.name} name="soundType" value={sound.name} onChange={this.handleChange}/><label>{sound.name}</label></Fragment>)
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    data.append("name", this.state.name);
    data.append("file", this.state.file);
    data.append("sound_type", this.state.soundType)
    fetch("http://localhost:3000/api/v1/sounds", {
      method: "POST",
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ url: data[data.length-1].url });
        this.props.setSounds(data)
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

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Name: <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />

          Type: {this.renderTypes()}
          <input type="file" onChange={this.handleFileUpload} />
          <input type="submit" value="Upload" />
        </form>

        {!!this.state.imageURL ? (
          <img src={this.state.imageURL} alt="img" />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sounds: state.sound.sounds
  }
}
//
// function mapDispatchToProps(dispatch){
//   return {
//
//   }
// }
//
export default connect(mapStateToProps, { setSounds })(UploadSound);
// export default UploadSound
