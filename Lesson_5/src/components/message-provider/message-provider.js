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
        value: "",
        lastMessage: {}

      },
      {
        title: "room2",
        value: "",
        lastMessage: {}
      }
    ],
    messages: {
      room1: [],
      room2: []
    },
  }

  handleChangeValue = ({ target }) => {

    this.setState((state, props) => ({
      conversations: state.conversations.map(e => {
        if (e.title === props.match.params.id) {
          e.value = target.value
        }
        return e
      })
    }))
  }

  sendMessage = ({ author, message, createdTs }) => {
    this.setState((state, props) => {
      const { id } = props.match.params

      const value = state.conversations.find((conversation) => conversation.title === id)
        ?.value || ""

      const msg = { author, message, createdTs }

      return {
        conversations: state.conversations.map(e => {
          if (e.title === props.match.params.id) {
            e.value = ""
            e.lastMessage = value
          }
          return e
        }),
        messages: Object.assign(
          {},
          state.messages,
          state.messages[id].push(msg),
          state.messages[id].push({ author: "bot", message: "ok", createdTs }))
      }
    }

    )
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

    const actions = { sendMessage: this.sendMessage.bind(this), handleValueChanged: this.handleValueChanged.bind(this) }

    return children([state, actions])
  }
}
