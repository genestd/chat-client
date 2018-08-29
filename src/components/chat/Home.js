import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { bindActionCreators } from 'redux'
import md5 from 'md5'
import ConversationList from './ConversationList'
import Conversation from './Conversation'
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

  async componentDidMount() {
    try {
      const conversations = await API.graphql(graphqlOperation(queries.GetUserConversations, {username: this.props.user.email}))
      this.props.actions.setUserConversations(conversations.data.getUserConversation.items)

      const subscription = API.graphql(graphqlOperation(subscriptions.onAddMessage))
        .subscribe({
          next: (eventData) => {
            this.props.actions.receiveMessage(eventData.value.data.onAddMessage)
            this.scroll()
          }
        })
      this.scroll()
    } catch(error) {
      console.log(error)
    }
  }

  scroll = () => {
    const el = document.getElementById('chat-scroller')
    if (el)
      el.scrollTop = (el.scrollHeight - el.clientHeight)
  }

  handleInputChange = e => this.setState({message: e.target.value})

  handleKeyPress = async e => {
    if (e.key === 'Enter' || e.charCode ===13 ) {
      const result = await API.graphql(graphqlOperation(mutations.addMessage, {
        id: this.props.appState.activeConversation,
        messageId: md5(`${this.state.message}${Date.now()}`),
        timestamp: Math.floor(Date.now()/1000),
        sender: this.props.user.email,
        participants: this.props.appState.conversationDetails[0].participants,
        message: this.state.message,
      }))
      this.setState({message: ''})
    }
  }

  addConversation = async () => {
    try {
      const users = await API.graphql(graphqlOperation(queries.GetAllUsers, {limit: 25}))
      this.props.actions.updateUserList(users.data.getAllUsers.items)
    } catch(error) {
      console.log(error)
    }

  }

  onConversationClick = async id => {
    const result = await API.graphql(graphqlOperation(queries.GetConversationById, {id}))
    this.props.actions.setActiveConversation(id, result.data.getConversations.items)
    this.scroll()
  }

  render() {
    return (
      <div className="chat__container">
        <div className="chat__left-pane">
          <ConversationList
            conversations={this.props.appState.conversations}
            activeConversation={this.props.appState.activeConversation}
            onConversationClick={this.onConversationClick}
          />
          <button className="chat__button" onClick={this.addConversation}>Start Chat</button>
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
