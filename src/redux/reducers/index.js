import userReducer from './userReducer'
import spriteReducer from './spriteReducer'
import soundReducer from './soundReducer'
import { combineReducers } from 'redux';

export default combineReducers({
  user: userReducer,
  sprite: spriteReducer,
  sound: soundReducer
})
