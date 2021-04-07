import { ThemeProvider, createMuiTheme } from "@material-ui/core"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./index.css"
import { ChatPage } from "./pages"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#182742'
    },
  },
})

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/chat" component={(params) => (
          <ChatPage {...params} />
        )} />
        <Route path="*" component={() => <h1 className="error">Страница не найдена</h1>} />
      </Switch>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root"),
)