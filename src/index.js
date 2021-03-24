// import { Test } from "@components/app"
import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
// import styles from "./index.module.css"

import "./index.css"

const initMsg = ["Hello"]

const Messages = () => {

  const [value, setValue] = useState("")
  const [messages, setMessages] = useState(initMsg)

  return (
    <div>
      <h1>Messages</h1>
      { messages.map((msg, idx) => (<p key={idx}>{msg}</p>))}
      <input placeholder="Введите сообщение" onChange={e => setValue(e.target.value)} />
      <button onClick={() => setMessages([...messages, value])}>Отправить</button>
    </div>
  )
}

ReactDOM.render(
  <>
    <Messages title="title" />
  </>,
  document.querySelector("#root"),
)