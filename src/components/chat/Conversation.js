import React from 'react'

const Conversation = props => (
  <div id="conversation-container">
    {
      props.details.sort((a, b) => a.timestamp - b.timestamp)
      .map(msg => {
        const cssClass = msg.sender === props.user.email ? "-sender" : "-recipient"
        return <div key={msg.messageId} className={`conversation__message${cssClass}`}>
          <span className={`conversation__message${cssClass}-text`}>{msg.message}</span>
        </div>
      })
    }
  </div>
)

export default Conversation
