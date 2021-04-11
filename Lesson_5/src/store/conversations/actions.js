import { ADD_CONVERSATION, CHANGE_VALUE } from "./types"

export const addConversation = (params) => {
  if (!params) return
  return {
    type: ADD_CONVERSATION,
    payload: params,
  }
}

export const changeValue = (params) => {
  return {
    type: CHANGE_VALUE,
    payload: params,
  }
}
