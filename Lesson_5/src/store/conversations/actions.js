import { ADD_CONVERSATION } from "./types"

export const addConversation = (contact) => {
  return {
    type: ADD_CONVERSATION,
    payload: contact,
  }
}
