const queries = {
  GetAllUsers: `query GetAllUsers($limit: Int){
    getAllUsers(limit: $limit) {
      items {
        username
        name
      }
    }
  }`,
  GetUserByEmail: `query GetUserByEmail($username: String!) {
    getUsers(username: $username) {
      username
      name
    }
  }`,
  GetConversationById: `query GetConversationById($id: String!){
    getConversations(id: $id) {
      items {
        id
        messageId
        sender
        participants
        message
        timestamp
      }
    }
  }`,
  GetUserConversations: `query GetUserConversations($username: String!){
    getUserConversation(username: $username) {
      items {
        username
        id
        partner
      }
    }
  }`
}

export default queries
