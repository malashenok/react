import { format } from "date-fns"
import { MESSAGE_SEND, sendMessage } from "../messages"

export const botSendMessage = (store) => (next) => (action) => {
  const { id, author } = action.payload ?? {}

  if (action.type === MESSAGE_SEND && author !== "bot") {
    setTimeout(() => {
      store.dispatch(
        sendMessage({
          id,
          author: "bot",
          message: "Привет, как дела?",
          createdTs: format(new Date(), "HH:mm:ss"),
        }),
      )
    }, 500)
  }

  return next(action)
}
