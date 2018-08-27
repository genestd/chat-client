import * as userActions from '../actions/user'
const INITIAL_STATE = {
  loggedIn: false,
  email: '',
}

const userReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    
    case userActions.LOGIN:
      return {
        ...state,
        loggedIn: true,
        email: action.email,
        name: action.name,
        conversations: action.conversations,
      }
      
    default: 
      return state
  }
  
}

export default userReducer