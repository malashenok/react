import { Header, MessageList, Layout, ChatList } from "@components"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import styles from "./chat.module.css"

export class ChatPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  componentDidMount() {
    document.addEventListener("keydown", this.listenExistChat)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.listenExistChat)
  }

  listenExistChat = ({ code }) => {
    if (code === "Escape") {
      const { history } = this.props
      history.push("/chat")
    }
  }

  render() {
    return (
      <Switch>
        <Route path={["/chat/:id", "/chat"]}>
          {(params) => {
            return (
              <Layout header={<Header />} chats={<ChatList {...params} />}>
                <Route path="/chat/:id">
                  <MessageList {...params} />
                </Route>
                <Route exact={true} path="/chat">
                  <h1 className={styles.error}>Выберите чат</h1>
                </Route>
              </Layout>
            )
          }}
        </Route>
        <Route
          path="*"
          component={() => <h1 className={styles.error}>такого чата нет</h1>}
        />
      </Switch>
    )
  }
}
