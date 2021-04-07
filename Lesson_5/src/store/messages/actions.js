import { MESSAGE_SEND } from "./types"

// params { author, message, roomid}
export const sendMessage = (params) => {
  return {
    type: MESSAGE_SEND,
    payload: params,
  }
}
