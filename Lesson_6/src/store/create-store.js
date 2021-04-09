import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { conversationsReducer } from "./conversations"
import { messagesReducer } from "./messages"
import { botSendMessage, logger } from "./middlewares"

const reducers = combineReducers({ conversationsReducer, messagesReducer })

export const store = createStore(
  reducers,

  compose(
    applyMiddleware(botSendMessage, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : () => {},
  ),
)
