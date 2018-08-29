import React from 'react'
import '../../styles/Chat.css'

const ConversationList = props => {
  return (
    <div className="conversations__container">
      <div className="conversations__header">
        Current Conversations
      </div>
      <div>
        {props.conversations.map(conv => {
          const activeClass = conv.id === props.activeConversation ? 'conversation__active' : ''
          return <div className={`conversation__item ${activeClass}`} key={conv.id} onClick={() => props.onConversationClick(conv.id)}>{conv.partner}</div>
        })}
      </div>
    </div>
  )
}

export default ConversationList
