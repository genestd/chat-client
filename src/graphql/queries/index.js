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
      conversations
    }
  }`,
}

export default queries
