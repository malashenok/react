import { createReducer } from "../../utils/create-reducer"
import {
  MESSAGE_SEND,
  MESSAGE_DELETE,
  MESSAGE_DELETE_BY_KEYS,
  GET_MESSAGE_ERROR,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_PENDING,
} from "./types"

const initialState = {
  messages: {},
  messagesPending: false,
  error: null,
}

export const messagesReducer = createReducer(initialState, {
  [MESSAGE_SEND]: (state, { payload = {} }) => ({
    ...state,
    messages: {
      ...state.messages,
      [payload.id]: [
        ...(state.messages[payload.id] || []),
        {
          author: payload.author,
          message: payload.message,
          createdTs: payload.createdTs,
        },
      ],
    },
  }),

  [MESSAGE_DELETE]: (state, { payload }) => {
    return {
      ...state,
      messages: Object.keys(state.messages).reduce((obj, key) => {
        if (key !== payload.id) {
          obj[key] = state.messages[key]
        }
        return obj
      }, {}),
    }
  },
  [MESSAGE_DELETE_BY_KEYS]: (state, { payload }) => {
    console.log(payload, state.messages)
    return {
      ...state,
      messages: {
        ...state.messages,
        [payload.id]: state.messages[payload.id].filter(
          (msg) =>
            !(
              msg.message === payload.message &&
              msg.createdTs === payload.createdTs
            ),
        ),
      },
    }
  },
  [GET_MESSAGE_PENDING]: (state) => ({
    ...state,
    messagesPending: true,
  }),
  [GET_MESSAGE_SUCCESS]: (state, { payload }) => ({
    ...state,
    messages: {
      ...state.messages,
      [payload.roomId]: payload.messages,
    },
    messagesPending: false,
  }),
  [GET_MESSAGE_ERROR]: (state, { payload }) => ({
    ...state,
    messagesPending: false,
    error: payload,
  }),
})
