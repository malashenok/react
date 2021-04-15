import { DELETE_CONVERSATION } from "../conversations"
import { delMessage } from "../messages"

export const delChat = (store) => (next) => (action) => {
  const { id } = action.payload ?? {}
  if (action.type === DELETE_CONVERSATION) {
    store.dispatch(
      delMessage({
        id,
      }),
    )
  }
  return next(action)
}
