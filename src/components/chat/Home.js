import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { bindActionCreators } from 'redux'
import md5 from 'md5'
import ConversationList from './ConversationList'
import Conversation from './Conversation'
import UserList from './UserList'
import { connect } from 'react-redux'
import queries from '../../graphql/queries'
import mutations from '../../graphql/mutations'
import subscriptions from '../../graphql/subscriptions'
import * as actions from '../../actions/appActions'

class Home extends Component {
  state = {
    message: '',
    canScroll: false,
  }

  // Load conversations for this user
  // Subscribe to new messages
  async componentDidMount() {
    try {
      const conversations = await API.graphql(graphqlOperation(queries.GetUserConversations, {username: this.props.user.email}))
      this.props.actions.setUserConversations(conversations.data.getUserConversation.items)

      API.graphql(graphqlOperation(subscriptions.onAddMessage))
        .subscribe({
          next: (eventData) => {
            this.props.actions.receiveMessage(eventData.value.data.onAddMessage)
            this.scroll()
          }
        })
        API.graphql(graphqlOperation(subscriptions.onAddConversation))
          .subscribe({
            next: (eventData) => {
                console.log('eventData', eventData)
                if (eventData.value.data.onAddUserConversation.username === this.props.user.email)
                    this.props.actions.addConversation(eventData.value.data.onAddUserConversation)
            }
          })
      this.scroll()
    } catch(error) {
      console.log(error)
    }
  }

  // Scroll to bottom of messages when received
  scroll = () => {
    const el = document.getElementById('chat-scroller')
    if (el)
      el.scrollTop = (el.scrollHeight - el.clientHeight)
  }

  // Capture message input
  handleInputChange = e => this.setState({message: e.target.value})

  // Create add message mutation on ENTER key
  handleKeyPress = async e => {
    if (e.key === 'Enter' || e.charCode ===13 ) {

      const result = await API.graphql(graphqlOperation(mutations.addMessage, {
        id: this.props.appState.activeConversation,
        messageId: md5(`${this.state.message}${Date.now()}`),
        timestamp: Math.floor(Date.now()/1000),
        sender: this.props.user.email,
        participants: this.props.appState.conversationDetails[0].participants,
        message: JSON.stringify(this.state.message).slice(1, -1),
      }))
      this.setState({message: ''})
    }
  }

  // Refresh user list from graphql
  refreshUsers = async () => {
    try {
      const users = await API.graphql(graphqlOperation(queries.GetAllUsers, {limit: 25}))
      this.props.actions.updateUserList(users.data.getAllUsers.items)
    } catch(error) {
      console.log(error)
    }

  }

  // Select a conversation to show messages
  onConversationClick = async id => {
    const result = await API.graphql(graphqlOperation(queries.GetConversationById, {id}))
    this.props.actions.setActiveConversation(id, result.data.getConversations.items)
    this.scroll()
  }

  // Add a new conversation to the list
  onAddConversation = async partner => {
    const id = md5(`${partner}${Date.now()}`)
    try {
      const result1 = await API.graphql(graphqlOperation(mutations.addUserConversation, {
        username: this.props.user.email,
        id,
        partner
      }))
      // this.props.actions.addConversation({
      //   username: this.props.user.email,
      //   id,
      //   partner
      // })
      this.props.actions.setActiveConversation(id, [] ,partner)
      const result2 = await API.graphql(graphqlOperation(mutations.addUserConversation, {
        username: partner,
        id,
        partner: this.props.user.email,
      }))
      const result3 = await API.graphql(graphqlOperation(mutations.addMessage, {
        id,
        messageId: md5(`message${Date.now()}`),
        timestamp: Math.floor(Date.now()/1000),
        sender: this.props.user.email,
        participants: [this.props.user.email, partner],
        message: 'Starting new chat',
      }))
    } catch(error) {
      console.log(error)
    }
  }

  userFilter = user => {
    return user.username !== this.props.user.email && !this.props.appState.conversations.some(conv => conv.partner === user.username)
  }

  render() {
    return (
      <div className="chat__container">
        <div className="chat__left-pane">
          <div className="chat__left-top">
            <ConversationList
              conversations={this.props.appState.conversations}
              activeConversation={this.props.appState.activeConversation}
              onConversationClick={this.onConversationClick}
            />
          </div>
          <div className="chat__left-bottom">
            <UserList
              users={this.props.appState.userList.filter(this.userFilter)}
              onAddConversation={this.onAddConversation}
            />
            <button className="chat__button" onClick={this.refreshUsers}>Refresh Users</button>
          </div>
        </div>
        <div className="chat__right-pane">
          <div id="chat-scroller" className="chat__right-top">
            { this.props.appState.conversationDetails &&
              <Conversation
                details={this.props.appState.conversationDetails}
                user={this.props.user}
                ref={this.saveRef}
              />
            }
          </div>
          <div className="chat__right-bottom">
            <input disabled={!this.props.appState.activeConversation} className="chat__input" onKeyPress={this.handleKeyPress} onChange={this.handleInputChange} value={this.state.message}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  appState: state.appState,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
