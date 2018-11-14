import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
// import { Card, Image } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'


class Profile extends Component {
  render() {
    return (
      <Fragment>
        <h1>{this.props.user.first_name}</h1>
      </Fragment>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

// const connectedToReduxHOC = connect(mapStateToProps)
// const connectedProfile = connectedToReduxHOC(Profile)
//
// const withAuthProfile = withAuth(connectedProfile)
//
// export default withAuthProfile

export default withAuth(connect(mapStateToProps)(Profile))
