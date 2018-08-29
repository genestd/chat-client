import update from 'immutability-helper'
import * as appActions from '../actions/appActions'

const INITIAL_STATE = {
  activeConversation: null,
  conversations: [],
  userList: []
}

const appStateReducer = (state=INITIAL_STATE, action) => {

  switch (action.type) {

    case appActions.SET_ACTIVE_CONVERSATION:
      return {
        ...state,
        activeConversation: action.id,
        conversationDetails: action.conv
      }

    case appActions.RECEIVE_MESSAGE:
      return update(state, {
        conversationDetails: {
          $push: [action.msg]
        }
      })

    case appActions.SET_USER_CONVERSATIONS:
      return {
        ...state,
        conversations: action.conversations,
      }

    case appActions.UPDATE_USER_LIST:
      return {
        ...state,
        userList: action.users,
      }

    default:
      return state
  }
}

export default appStateReducer