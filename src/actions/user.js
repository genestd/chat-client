export const LOGIN = 'LOGIN'

export const login = (email, name = '', conversations = []) => ({
  type: LOGIN,
  email,
  name, 
  conversations,
})

