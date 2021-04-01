import React, { createRef } from "react"
import Message from "./Message"

export default class MessageField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: ["Привет!", "Как дела?"].map(
        (e) => `${this.props.userName}: ${e}`,
      ),
    }
    this.inputRef = createRef()
  }

  componentDidUpdate() {
    if (this.state.messages.length % 2 === 1) {
      setTimeout(
        () =>
          this.setState((state, props) => ({
            messages: [
              ...state.messages,
              `${props.botName}: Что значит ${this?.inputRef.current.value}, ${props.userName}?`,
            ],
          })),
        1000,
      )
    }
  }

  handleClick = () => {
    this.setState((state, props) => ({
      messages: [
        ...state.messages,
        `${props.userName}: ${this.inputRef.current.value}`,
      ],
    }))
  }

  render() {
    const messageElements = this.state.messages.map((msg, idx) => (
      <Message key={idx} text={msg} />
    ))
    return (
      <div>
        {messageElements}
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">mode_edit</i>
            <input
              ref={this.inputRef}
              type="text"
              placeholder="Введите сообщение"
            />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light"
          onClick={this.handleClick}
        >
          Отправить<i className="material-icons right">send</i>
        </button>
      </div>
    )
  }
}
