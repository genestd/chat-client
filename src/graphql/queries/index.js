const queries = {
  GetUserByEmail: `query GetUserByEmail($username: String!) {
    getUsers(username: $username) {
      username
      name
      conversations
    }
  }`,
}

export default queries