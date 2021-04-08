import { Input, withStyles, InputAdornment } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { format } from "date-fns"
import React, { Component, createRef } from "react"
import { connect } from "react-redux"
import { changeValue } from "../../store/conversations"
import { sendMessage } from "../../store/messages"
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

  handlePressInput = (event, value, id) => {
    if (event.code === "Enter" && value) {
      this.props.sendMessageWithDispatch({
        id,
        author: "User",
        message: value,
        createdTs: format(new Date(), "HH:mm:ss"),
      })
    }
  }

  handleScrollBottom = () => {
    if (this.ref.current) {
      this.ref.current.scrollTo(0, this.ref.current.scrollHeight)
    }
  }

  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props

    const {
      messages,
      conversations,
      sendMessageWithDispatch,
      changeValueWithDispatch,
    } = this.props

    const value = conversations.find((e) => e.title === id)?.value ?? ""

    const newMessage = {
      author: "User",
      message: value,
      createdTs: format(new Date(), "HH:mm:ss"),
    }

    return (
      <>
        <div ref={this.ref} className={styles.grid}>
          {(messages[id] ?? []).map((message, index) => (
            <Message msg={message} key={index} />
          ))}
        </div>
        <StyledInput
          fullWidth={true}
          value={value}
          onChange={(e) => {
            changeValueWithDispatch({ title: id, value: e.target.value })
          }}
          onKeyPress={(e) => {
            this.handlePressInput(e, value, id)
          }}
          placeholder="Введите сообщение..."
          endAdornment={
            <InputAdornment position="end">
              {value && (
                <Send
                  className={styles.icon}
                  onClick={() => {
                    sendMessageWithDispatch({
                      id,
                      ...newMessage,
                    })
                    changeValueWithDispatch({
                      title: id,
                      value: "",
                    })
                  }}
                />
              )}
            </InputAdornment>
          }
        />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  messages: state.messagesReducer,
  conversations: state.conversationsReducer,
})

const mapDispatchToProps = (dispatch) => ({
  sendMessageWithDispatch: (params) => dispatch(sendMessage(params)),
  changeValueWithDispatch: (params) => dispatch(changeValue(params)),
})

export const MessageList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageListView)
