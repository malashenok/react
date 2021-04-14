import {
  MESSAGE_SEND,
  MESSAGE_DELETE,
  MESSAGE_DELETE_BY_KEYS,
  GET_MESSAGE_ERROR,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_PENDING,
} from "./types"

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

export const delMessageByKeys = (params) => {
  return {
    type: MESSAGE_DELETE_BY_KEYS,
    payload: params,
  }
}

export const getMessagesById = (roomId) => async (
  dispatch,
  getState,
  request,
) => {
  dispatch({ type: GET_MESSAGE_PENDING })
  try {
    const { data } = await request.get(`/messages/${roomId}`)
    dispatch({ type: GET_MESSAGE_SUCCESS, payload: data })
  } catch {
    dispatch({ type: GET_MESSAGE_ERROR })
  }
}
