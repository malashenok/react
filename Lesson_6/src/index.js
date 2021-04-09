import { ThemeProvider, createMuiTheme } from "@material-ui/core"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./index.css"
import { PersistGate } from "redux-persist/integration/react"
import { ChatPage } from "./pages"
import { store, persistor } from "./store"
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#182742",
    },
  },
})

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route
              path="/chat"
              component={(params) => <ChatPage {...params} />}
            />
            <Route
              path="*"
              component={() => <h1 className="error">Страница не найдена</h1>}
            />
          </Switch>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
)
