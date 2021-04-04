import { ThemeProvider, createMuiTheme } from "@material-ui/core"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Header, MessageList, Layout, ChatList } from "./components"

import "./index.css"

class App extends Component {
  render() {
    return <MessageList />
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
  },
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Layout header={<Header />} messages={<App />} chats={<ChatList />} />
  </ThemeProvider>,
  document.getElementById("root"),
)