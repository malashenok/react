import { List, Button } from "@material-ui/core"
import { push } from "connected-react-router"
import React, { Component } from "react"
import { connect } from "react-redux"
import {
  addConversation,
  delConversation,
  getConversations,
} from "../../store/conversations"
import { getProfileByUserName } from "../../store/profiles"
import { AddContactModal } from "../add-to-contact-modal"
import { Chat } from "./chat"
import styles from "./chat-list.module.css"

export class ChatListView extends Component {
  state = {
    isOpen: false,
    onClose: "",
  }

  toggleModal = () => {
    this.setState((state) => ({ isOpen: !state.isOpen }))
  }

  componentDidMount() {
    this.props.getConversations()
  }

  render() {
    const { isOpen } = this.state
    const {
      match,
      conversations,
      messages,
      addConversation,
      delConversation,
      push,
      conversationsPending,
      getProfileByUserName,
    } = this.props
    const { id } = match.params

    return conversationsPending ? (
      <h1>Загрузка данных...</h1>
    ) : (
      <>
        <div className={styles.wrapper}>
          <List component="nav">
            {conversations.map((chat) => {
              const msg = messages[chat.title] || []
              return (
                <Chat
                  key={chat.title}
                  title={chat.title}
                  selected={id === chat.title}
                  lastMessage={msg[msg.length - 1]}
                  delChat={(title) => {
                    delConversation({ title })
                  }}
                  addChat={this.toggleModal}
                  handleNavigate={() => push(`/chat/${chat.title}`)}
                  getProfileByUserName={getProfileByUserName}
                />
              )
            })}
          </List>

          <AddContactModal
            isOpen={isOpen}
            onClose={this.toggleModal}
            onClick={(title) => {
              addConversation({ title })
            }}
            conversations={conversations}
          />
          <div className={styles.button}>
            <Button
              variant="contained"
              fullWidth={true}
              onClick={this.toggleModal}
            >
              Новый чат
            </Button>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  messages: state.messagesReducer.messages,
  conversations: state.conversationsReducer.conversations.sort((a, b) =>
    a.title.localeCompare(b.title),
  ),
  conversationsPending: state.conversationsReducer.conversationsPending,
})

const mapDispatchToProps = (dispatch) => ({
  addConversation: (params) => dispatch(addConversation(params)),
  delConversation: (params) => dispatch(delConversation(params)),
  push: (link) => dispatch(push(link)),
  getConversations: () => dispatch(getConversations()),
  getProfileByUserName: (params) => dispatch(getProfileByUserName(params)),
})

export const ChatList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatListView)
