import { List, Button } from "@material-ui/core"
import React, { Component } from "react"
import { connect } from "react-redux"
import { addConversation, delConversation } from "../../store/conversations"
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

  handleNavigate = (link) => {
    const { history } = this.props
    history.push(link)
  }

  render() {
    const { isOpen } = this.state
    const {
      match,
      conversations,
      messages,
      addConversation,
      delConversation,
    } = this.props
    const { id } = match.params

    return (
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
                  onClick={() => {
                    this.handleNavigate(`/chat/${chat.title}`)
                  }}
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
  messages: state.messagesReducer,
  conversations: state.conversationsReducer.sort((a, b) =>
    a.title.localeCompare(b.title),
  ),
})

const mapDispatchToProps = (dispatch) => ({
  addConversation: (params) => dispatch(addConversation(params)),
  delConversation: (params) => dispatch(delConversation(params)),
})

export const ChatList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatListView)
