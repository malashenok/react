import { MESSAGE_SEND, MESSAGE_DELETE } from "./types"

export const sendMessage = (params) => {
  return {
    type: MESSAGE_SEND,
    payload: params,
  }
}

export const delMessage = (params) => {
  return {
    type: MESSAGE_DELETE,
    payload: params,
  }
}
