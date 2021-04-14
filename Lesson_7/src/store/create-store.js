import { connectRouter, routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { conversationsReducer } from "./conversations"
import { messagesReducer } from "./messages"
import { botSendMessage, logger, delChat } from "./middlewares"
const config = {
  key: "root",
  storage,
  whitelist: ["messagesReducer", "conversationsReducer"],
}
export const history = createBrowserHistory()

export const store = createStore(
  persistReducer(
    config,
    combineReducers({
      router: connectRouter(history),
      conversationsReducer,
      messagesReducer,
    }),
  ),
  compose(
    applyMiddleware(botSendMessage, logger, delChat, routerMiddleware(history)),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : () => {},
  ),
)

export const persistor = persistStore(store)
