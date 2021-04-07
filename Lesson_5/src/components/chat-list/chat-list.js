import { List } from "@material-ui/core"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Chat } from "./chat"

export class ChatListView extends Component {
  render() {
    const { match, conversations } = this.props
    const chatId = match?.params.id || ""

    return (
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
    )
  }
}

const mapStateToProps = (state) => ({
  conversations: state.conversationsReducer,
})

export const ChatList = connect(mapStateToProps)(ChatListView)
