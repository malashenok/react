import { MESSAGE_SEND } from "./types"

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
    default:
      return state
  }
}
