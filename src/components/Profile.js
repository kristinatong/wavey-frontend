import React from 'react'
import { connect } from 'react-redux'
// import { Card, Image } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

// props: { user: { avatar: 'url', username: 'Chandler Bing', bio: 'bio' } }
const Profile = ({ avatar, username, bio }) => (
  <React.Fragment>hi</React.Fragment>
)
//
// <Card>
//   <Image src={avatar} />
//   <Card.Content>
//     <Card.Header>{username}</Card.Header>
//
//     <Card.Description>{bio}</Card.Description>
//   </Card.Content>
// </Card>

// const mapStateToProps = (reduxStoreState) => {
//   return {
//     avatar: reduxStoreState.usersReducer.user.avatar,
//     username: reduxStoreState.usersReducer.user.username,
//     bio: reduxStoreState.usersReducer.user.bio
//   }
// }

const mapStateToProps = (state) => {
  return {
    // email: state.user.user.email,
    // firstName: state.user.user.first_name,
    // lastName: state.user.user.last_name
  }
}

// const connectedToReduxHOC = connect(mapStateToProps)
// const connectedProfile = connectedToReduxHOC(Profile)
//
// const withAuthProfile = withAuth(connectedProfile)
//
// export default withAuthProfile

export default withAuth(connect(mapStateToProps)(Profile))
