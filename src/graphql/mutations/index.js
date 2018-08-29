const mutations = {
  addUser: `mutation addUser($username: String!, $name: String) {
    addUsers(username: $username, name: $name) {
      username
      name
    }
  }`,
  addMessage: `mutation addMessage($id: String!, $messageId: String!, $timestamp: Int!, $sender: String!, $participants: [String]!, $message: String!) {
    addMessage(id: $id, messageId: $messageId, timestamp: $timestamp, sender: $sender, participants: $participants, message: $message) {
      id
      messageId
      timestamp
      sender
      participants
      message
    }
  }`
}

export default mutations
