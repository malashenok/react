import PropTypes from "prop-types"
import { Component } from "react"

export class MessageProvider extends Component {

  static propTypes = {
    children: PropTypes.func.isRequired,
    match: PropTypes.object,
  }

  state = {
    conversations: [
      {
        title: "room1",
        value: "value from room1",
        lastMessage: {}

      },
      {
        title: "room2",
        value: "value from room2",
        lastMessage: {}
      }
    ],
    messages: {
      room1: [],
      room2: []
    },
  }

  sendMessage({ author, message, createdTs }) {

    const id = this.props.match.params.id
    const msg = { author, message, createdTs }

    this.setState((state) => ({
      conversations: state.conversations.map(e => {
        if (e.title === id) {
          e.value = message
          e.lastMessage = msg
        }
        return e
      }),
      messages: Object.assign(
        {},
        state.messages,
        state.messages[id].push(msg),
        state.messages[id].push({ author: "bot", message: "ok", createdTs }))
    }))
  }

  render() {

    const { children, match } = this.props
    const { messages, conversations } = this.state

    const { id } = match.params ?? {}

    const state = {
      conversations,
      messages: messages[id] ?? [],
      value:
        conversations.find((conversation) => conversation.title === id)
          ?.value || "",
    }

    const actions = { sendMessage: this.sendMessage.bind(this) }

    return children([state, actions])
  }
}
