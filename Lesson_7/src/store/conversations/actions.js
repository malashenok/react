import { request } from "../../api"
import {
  ADD_CONVERSATION,
  CHANGE_VALUE,
  DELETE_CONVERSATION,
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_ERROR,
  GET_CONVERSATION_PENDING,
} from "./types"
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

export const getConversations = () => async (dispatch, getState, params) => {
  dispatch({ type: "PENDING" })

  try {
    const { data } = await request.get("conversations")
    dispatch({ type: "SUCESS", payload: data })
  } catch {
    dispatch({ type: "ERROR" })
  }
}
