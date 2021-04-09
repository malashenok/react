import { List, Button } from "@material-ui/core"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { addConversation } from "../../store/conversations"
import { AddContactModal } from "../modal"
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

  render() {
    const { isOpen } = this.state
    const {
      match,
      conversations,
      messages,
      addConversationWithDispatch,
    } = this.props

    const chatId = match?.params.id || ""

    return (
      <>
        <div className={styles.wrapper}>
          <List component="nav">
            {conversations.map((chat) => (
              <Link key={chat.title} to={`/chat/${chat.title}`}>
                <Chat
                  title={chat.title}
                  selected={chatId === chat.title}
                  lastMessage={messages[chat.title]?.slice(-1) ?? []}
                />
              </Link>
            ))}
          </List>

          <AddContactModal
            isOpen={isOpen}
            onClose={this.toggleModal}
            onClick={(title) => {
              addConversationWithDispatch({ title })
            }}
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
  messages: state.messagesReducer,
  conversations: state.conversationsReducer.sort((a, b) =>
    a.title.localeCompare(b.title),
  ),
})

const mapDispatchToProps = (dispatch) => ({
  addConversationWithDispatch: (params) => dispatch(addConversation(params)),
})

export const ChatList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatListView)
