import { MESSAGE_SEND, MESSAGE_DELETE } from "./types"

const initialState = {
  room1: [],
  room2: [],
}

export const messagesReducer = (state = initialState, action) => {
  const { id, author, message, createdTs } = action.payload ?? {}

  switch (action.type) {
    case MESSAGE_SEND:
      return {
        ...state,
        [id]: [...(state[id] || []), { author, message, createdTs }],
      }
    case MESSAGE_DELETE:
      return Object.keys(state).reduce((object, key) => {
        if (key !== id) {
          object[key] = state[key]
        }
        return object
      }, {})
    default:
      return state
  }
}
