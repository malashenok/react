import { createReducer } from "../../utils/create-reducer"
import { MESSAGE_SEND, MESSAGE_DELETE } from "./types"

const initialState = {
  room1: [],
  room2: [],
}

export const messagesReducer = createReducer(initialState, {
  [MESSAGE_SEND]: (state, { payload = {} }) => ({
    ...state,
    [payload.id]: [
      ...(state[payload.id] || []),
      {
        author: payload.author,
        message: payload.message,
        createdTs: payload.createdTs,
      },
    ],
  }),

  [MESSAGE_DELETE]: (state, { payload }) => {
    return Object.keys(state).reduce((obj, key) => {
      if (key !== payload.id) {
        obj[key] = state[key]
      }
      return obj
    }, {})
  },
})
