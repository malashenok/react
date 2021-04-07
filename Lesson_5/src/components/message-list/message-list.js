import { Input, withStyles, InputAdornment } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { format } from "date-fns"
import PropTypes from "prop-types"
import React, { Component, createRef } from "react"
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

export class MessageList extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    sendMessage: PropTypes.func.isRequired,
    handleChangeValue: PropTypes.func.isRequired
  }

  ref = createRef()

  handlePressInput = (event, value) => {

    if (event.code === "Enter") {
      this.props.sendMessage({ author: "User", message: value, createdTs: format(new Date(), "HH:mm:ss") })
    }
  }

  handleScrollBottom = () => {
    if (this.ref.current) {
      this.ref.current.scrollTo(0, this.ref.current.scrollHeight)
    }
  }

  render() {

    const { messages, value, sendMessage, handleChangeValue } = this.props

    return (
      <>
        <div ref={this.ref} className={styles.grid}>
          {messages.map((message, index) => (
            <Message msg={message} key={index} />
          ))}
        </div>
        <StyledInput
          fullWidth={true}
          value={value}
          onChange={e => { handleChangeValue(e.target.value) }}
          onKeyPress={e => { this.handlePressInput(e, value) }}
          placeholder="Введите сообщение..."
          endAdornment={
            <InputAdornment position="end">
              {value && (
                <Send
                  className={styles.icon}
                  onClick={() => {
                    sendMessage({ author: "User", message: value, createdTs: format(new Date(), "HH:mm:ss") })
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