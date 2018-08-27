import React from 'react'

const ConversationList = props => {
  return (
    props.conversations.map(conv => {
      return <div key={conv}>{conv}</div>
    })
  )
}

export default ConversationList
