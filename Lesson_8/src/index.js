import { ThemeProvider, createMuiTheme } from "@material-ui/core"
import { ConnectedRouter } from "connected-react-router"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Switch, Route, Redirect } from "react-router-dom"
import "./index.css"
import { PersistGate } from "redux-persist/integration/react"
import { ChatPage } from "./pages"
import { store, persistor, history } from "./store"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#182742",
    },
  },
})

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route
              path="/chat"
              component={(params) => <ChatPage {...params} />}
            />
            <Route path="*" component={() => <Redirect to="/chat" />} />
          </Switch>
        </ThemeProvider>
      </PersistGate>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
)
