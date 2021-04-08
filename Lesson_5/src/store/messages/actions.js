import { MESSAGE_SEND } from "./types"

export const sendMessage = (params) => {
  return {
    type: MESSAGE_SEND,
    payload: params,
  }
}
