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
    messages: PropTypes.array,
    value: PropTypes.string,
    sendMessage: PropTypes.func,
    handleValueChanged: PropTypes.func
  }

  ref = createRef()

  handlePressInput = (event, value) => {

    if (event.code === "Enter") {
      this.props.sendMessage({ author: "User", message: value, createdTs: format(new Date(), "HH:mm") })
    }
  }

  handleScrollBottom = () => {
    if (this.ref.current) {
      this.ref.current.scrollTo(0, this.ref.current.scrollHeight)
    }
  }

  render() {

    const { messages, sendMessage, handleValueChanged, value } = this.props
    const createdTs = format(new Date(), "HH:mm")

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
          onChange={(target) => { handleValueChanged(target) }}
          onKeyPress={(event) => { this.handlePressInput(event, value) }}
          placeholder="Введите сообщение..."
          endAdornment={
            <InputAdornment position="end">
              {value && (
                <Send
                  className={styles.icon}
                  onClick={() => {
                    sendMessage({ author: "User", message: value, createdTs })
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