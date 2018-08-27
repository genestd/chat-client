import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import ConversationList from './ConversationList'
import Conversation from './Conversation'
import ChatInput from './ChatInput'
import { connect } from 'react-redux'
import queries from '../../graphql/queries'

class Home extends Component {

  addConversation = async () => {
    console.log('Adding a conversation')
    const users = await API.graphql(graphqlOperation(queries.GetAllUsers, {limit: 25}))
    console.log(users)
  }
  render() {
    console.log(queries)
    return (
      <div className="chat__container">
        <div className="chat__left-pane">
          <ConversationList
            conversations={this.props.user.conversations}
          />
          <button className="chat__button" onClick={this.addConversation}>Start Chat</button>
        </div>
        <div className="chat__right-pane">
          <div className="chat__right-top">
            <Conversation
              messages={[]}
            />
          </div>
          <div className="chat__left-bottom">
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Home)
