import React from 'react'

const UserList = props => (
  <div>
    {props.users.map(user => {
      return (
        <div key={user.username} className="chat__user-record">
          {user.username} <button className="chat__add-button" onClick={() => props.onAddConversation(user.username)}>Chat</button>
        </div>
      )
    })}
  </div>
)

export default UserList
