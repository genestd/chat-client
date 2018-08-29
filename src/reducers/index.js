import { combineReducers } from 'redux'
import userReducer from './user'
import appStateReducer from './appState'

const indexReducer = combineReducers({
  user: userReducer,
  appState: appStateReducer,
})

export default indexReducer
