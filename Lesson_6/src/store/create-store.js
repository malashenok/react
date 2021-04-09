import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { conversationsReducer } from "./conversations"
import { messagesReducer } from "./messages"
import { botSendMessage, logger } from "./middlewares"

const config = {
  key: "root",
  storage,
  blackList: [],
  whiteList: [],
}

const createPersistReducer = () => {
  return persistReducer(
    config,
    combineReducers({ conversationsReducer, messagesReducer }),
  )
}

export const store = createStore(
  createPersistReducer(),
  compose(
    applyMiddleware(botSendMessage, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : () => {},
  ),
)

export const persistor = persistStore(store)
