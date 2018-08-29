export const SET_ACTIVE_CONVERSATION = 'SET_ACTIVE_CONVERSATION'
export const SET_USER_CONVERSATIONS = 'SET_USER_CONVERSATIONS'
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'
export const UPDATE_USER_LIST = 'UPDATE_USER_LIST'
export const ADD_CONVERSATION = 'ADD_CONVERSATION'

export const setActiveConversation = (id, conv, participant) => ({
  type: SET_ACTIVE_CONVERSATION,
  id,
  conv,
  participant
})

export const receiveMessage = msg => ({
  type: RECEIVE_MESSAGE,
  msg,
})

export const setUserConversations = conversations => ({
  type: SET_USER_CONVERSATIONS,
  conversations
})

export const updateUserList = users => ({
  type: UPDATE_USER_LIST,
  users,
})

export const addConversation = conversation => ({
  type: ADD_CONVERSATION,
  conversation,
})
