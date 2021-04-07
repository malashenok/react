import { format } from "date-fns"
import { Component } from "react"

export class MessageProvider extends Component {
  state = {
    conversations: [
      {
        title: "room1",
        value: "",
        lastMessage: {},
      },
      {
        title: "room2",
        value: "",
        lastMessage: {},
      },
    ],
    messages: {
      room1: [],
      room2: [],
    },
  }

  handleChangeValue = (value) => {
    this.setState((state, props) => {
      const {
        match: { params },
      } = props

      return {
        conversations: state.conversations.map((conversation) => {
          if (conversation.title === params.id) {
            return { ...conversation, value }
          }
          return conversation
        }),
      }
    })
  }

  sendMessage = ({ author, message, createdTs }) => {
    if (!message) return

    this.setState((state, props) => {
      const {
        match: { params },
      } = props

      const msg = { author, message, createdTs }

      return {
        conversations: state.conversations.map((conversation) => {
          if (conversation.title === params.id) {
            return { ...conversation, lastMessage: msg, value: "" }
          }
          return conversation
        }),
        messages: {
          ...state.messages,
          [params.id]: [...(state.messages[params.id] || []), msg],
        },
      }
    })
  }

  componentDidUpdate(_, prevState) {
    const {
      match: { params },
    } = this.props

    const { conversations, messages } = this.state

    if (!params.id) {
      return
    }

    const { lastMessage } = conversations.find(
      (conversation) => conversation.title === params.id,
    )

    const currentMessages = messages[params.id]
    const prevMessages = prevState.messages[params.id]

    if (lastMessage?.author !== "bot" && currentMessages !== prevMessages) {
      setTimeout(() => {
        this.sendMessage({
          author: "bot",
          message: "Как дела?",
          createdTs: format(new Date(), "HH:mm:ss"),
        })
      }, 500)
    }
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

    const actions = {
      sendMessage: this.sendMessage,
      handleChangeValue: this.handleChangeValue,
      componentDidUpdate: this.componentDidUpdate,
    }

    return children([state, actions])
  }
}
