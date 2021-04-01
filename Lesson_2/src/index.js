import App from "./components/MessageField"
import React from "react"
import ReactDOM from "react-dom"

ReactDOM.render(
  <>
    <App userName="Alex" botName="Bot" />
  </>,
  document.querySelector("#root"),
)