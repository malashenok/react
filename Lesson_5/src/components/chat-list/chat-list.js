import { List, Button } from "@material-ui/core"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { AddContactModal } from "../modal"
import { Chat } from "./chat"

export class ChatListView extends Component {
  state = {
    isOpen: false,
    onClose: "",
    conversations: [],
    addConversation: false,
  }

  toggleModal = () => {
    this.setState((state) => ({ isOpen: !state.isOpen }))
  }

  render() {
    const { isOpen } = this.state
    const { match, conversations } = this.props
    const chatId = match?.params.id || ""

    return (
      <>
        <div>
          <List component="nav">
            {conversations.map((chat) => (
              <Link key={chat.title} to={`/chat/${chat.title}`}>
                <Chat
                  title={chat.title}
                  selected={chatId === chat.title}
                  msg={chat.lastMessage}
                />
              </Link>
            ))}
          </List>
        </div>
        <AddContactModal isOpen={isOpen} onClose={this.toggleModal} />
        <Button variant="contained" fullWidth={true} onClick={this.toggleModal}>
          Новый чат
        </Button>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  conversations: state.conversationsReducer,
})

export const ChatList = connect(mapStateToProps)(ChatListView)
