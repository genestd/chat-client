const subscriptions = {
  onAddMessage: `subscription AddMessage {
    onAddMessage {
        id
        messageId
        timestamp
        sender
        participants
        message
    }
    }`,
    onAddConversation: `subscription AddUserConversation {
      onAddUserConversation {
          username
          id
          partner
      }
    }`
}
export default subscriptions
