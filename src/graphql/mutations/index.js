const mutations = {
  addUser: `mutation addUser($username: String!, $name: String) {
    addUsers(username: $username, name: $name) {
      username
      name
    }
  }`
}

export default mutations