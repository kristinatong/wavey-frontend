// import { API_ENDPOINT } from '../adapters/index'

export const /*FUNCTION*/ loginUser = (email, password) => {
  return /*FUNCTION*/ (dispatch) => { //thunk
    // console.log(process.env.REACT_APP_API_ENDPOINT)
    // dispatch({ type: 'AUTHENTICATING_USER' })
    dispatch(authenticatingUser())
    // fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/login`)
    fetch(`http://localhost:3000/api/v1/login`, { //TODO: move this to an adapter
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password
        }
      })
    })
      .then(response => {
        if (response.ok) { //was the HTTP status code < 400
          return response.json()
        } else {
          throw response
        }
      })
      /* { user:
        { email: 'chandler bing', bio: '', avatar: '' },
        jwt: 'aaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccc'
      } */
      .then(JSONResponse => {
        console.log('%c INSIDE YE OLDE .THEN', 'color: navy')
        localStorage.setItem('jwt', JSONResponse.jwt)
        // dispatch({ type: 'SET_CURRENT_USER', payload: JSONResponse.user })
        dispatch(setCurrentUser(JSONResponse.user))
      })
      .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })))
      // .then((jsonResponse) => {
      //   localStorage.setItem('jwt', jsonResponse.jwt)
      //   dispatch(setCurrentUser(jsonResponse.user))
      // })
  }
}

export const fetchCurrentUser = () => {
  // takes the token in localStorage and finds out who it belongs to
  return (dispatch) => {
    dispatch(authenticatingUser()) //tells the app we are fetching
    fetch(`http://localhost:3000/api/v1/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then((JSONResponse) => dispatch(setCurrentUser(JSONResponse.user)))
  }
}

export const setCurrentUser = (userData) => ({
  type: 'SET_CURRENT_USER',
  payload: userData
})

export const logOut = () => {
  localStorage.removeItem('jwt')
  return {
    type: 'LOG_OUT'
  }
}

export const failedLogin = (errorMsg) => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})

// tell our app we're currently fetching
export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })
