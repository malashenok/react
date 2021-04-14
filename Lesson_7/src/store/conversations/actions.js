import { ADD_CONVERSATION, CHANGE_VALUE, DELETE_CONVERSATION } from "./types"

/**
 * @param {Object} params
 * @param {string} title - chat id
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
 * @param {string} title - chat id
 * @param {string} value - chat value
 */
export const changeValue = (params) => {
  return {
    type: CHANGE_VALUE,
    payload: params,
  }
}

/**
 * @param {Object} params
 * @param {string} title - chat id
 * @param {string} value - chat value
 */
export const delConversation = (params) => {
  return {
    type: DELETE_CONVERSATION,
    payload: params,
  }
}
