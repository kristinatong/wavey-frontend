import React, { Component } from 'react'

class UploadSound extends Component{
  state = {
    name: "",
    file: null,
    fileURL: null,
  };

  handleSubmit = event => {
    event.preventDefault();

    const data = new FormData();
    data.append("name", this.state.name);
    data.append("file", this.state.file);
    fetch("http://localhost:3000/api/v1/sounds", {
      method: "POST",
      body: data,
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ fileURL: json.url });
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
    console.log(this.state)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
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

// function mapStateToProps(state) {
//   return {
//
//   }
// }
//
// function mapDispatchToProps(dispatch){
//   return {
//
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Player);
export default UploadSound
