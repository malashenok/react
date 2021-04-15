import { Input, withStyles, InputAdornment } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { format } from "date-fns"
import React, { Component, createRef } from "react"
import { connect } from "react-redux"
import {
  changeValue,
  sendMessage,
  getMessagesById,
  delMessageByKeys,
} from "../../store"
import { Message } from "./message"
import styles from "./message-list.module.css"

const StyledInput = withStyles(() => {
  return {
    root: {
      "&": {
        color: "#9a9fa1",
        padding: "10px 15px",
        fontSize: "15px",
      },
    },
  }
})(Input)

export class MessageListView extends Component {
  ref = createRef()

  handlePressInput = ({ code }) => {
    if (code === "Enter") {
      this.handleSendMessage()
    }
  }

  handleChangeInput = (event) => {
    const { changeValue, match } = this.props
    const { id } = match.params

    changeValue({ title: id, value: event?.target.value || "" })
  }

  handleSendMessage = () => {
    const { sendMessage, value, match } = this.props
    const { id } = match.params

    if (!value) {
      return
    }

    const newMessage = {
      id,
      author: "User",
      message: value,
      createdTs: format(new Date(), "HH:mm:ss"),
    }

    sendMessage(newMessage)
    this.handleChangeInput()
  }

  handleScrollBottom = () => {
    if (this.ref.current) {
      this.ref.current.scrollTo(0, this.ref.current.scrollHeight)
    }
  }

  getMessages = () => {
    const { match, getMessagesById } = this.props
    const { id } = match.params

    getMessagesById(id)
  }

  componentDidUpdate(prevProps) {
    const { id: prevId } = prevProps.match.params
    const { id } = this.props.match.params
    const messages = prevProps.messages

    if (prevId !== id && messages?.length === 0) {
      this.getMessages()
    }

    this.handleScrollBottom()
  }

  componentDidMount() {
    this.getMessages()
  }

  render() {
    const { messages, value, delMessageByKeys } = this.props
    const { id } = this.props.match.params
    return (
      <>
        <div ref={this.ref} className={styles.grid}>
          {messages.map((message, index) => (
            <Message
              msg={message}
              key={index}
              id={id}
              index={index.toString()}
              delMessageByKeys={delMessageByKeys}
            />
          ))}
        </div>
        <StyledInput
          fullWidth={true}
          value={value}
          onChange={(event) => {
            this.handleChangeInput(event)
          }}
          onKeyPress={(event) => {
            this.handlePressInput(event)
          }}
          placeholder="Введите сообщение..."
          endAdornment={
            <InputAdornment position="end">
              <Send
                className={styles.icon}
                onClick={() => {
                  this.handleSendMessage()
                }}
              />
            </InputAdornment>
          }
        />
      </>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params

  return {
    messages: state.messagesReducer.messages[id] || [],
    value:
      state.conversationsReducer.conversations.find(
        (conversation) => conversation.title === id,
      )?.value || "",
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (params) => dispatch(sendMessage(params)),
  changeValue: (params) => dispatch(changeValue(params)),
  getMessagesById: (id) => dispatch(getMessagesById(id)),
  delMessageByKeys: (params) => dispatch(delMessageByKeys(params)),
})

export const MessageList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageListView)
