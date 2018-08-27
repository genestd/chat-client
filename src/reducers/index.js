import { combineReducers } from 'redux'
import userReducer from './user'

const indexReducer = combineReducers({
  user: userReducer,
})

export default indexReducer