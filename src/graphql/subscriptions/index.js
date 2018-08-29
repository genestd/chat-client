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
  }`
}
export default subscriptions
