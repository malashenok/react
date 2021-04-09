import { ADD_CONVERSATION, CHANGE_VALUE } from "./types"

/**
 * @param {Object} params
 * @param {strung} title - chat id
 * @param {string} value - chat value
 */
export const addConversation = (params) => {
  if (!params) return
  return {
    type: ADD_CONVERSATION,
    payload: params,
  }
}

/**
 * @param {Object} params
 * @param {strung} title - chat id
 * @param {string} value - chat value
 */
export const changeValue = (params) => {
  return {
    type: CHANGE_VALUE,
    payload: params,
  }
}
