import { ADD_CONVERSATION, CHANGE_VALUE } from "./types"

const initialState = [
  { title: "room1", value: "" },
  { title: "room2", value: "" },
]

export const conversationsReducer = (state = initialState, action) => {
  const { title, value } = action.payload ?? {}

  switch (action.type) {
    case ADD_CONVERSATION:
      if (state.find((e) => e.title === title)) {
        return [...state]
      } else {
        return [...state, { title, value: "" }]
      }
    case CHANGE_VALUE:
      return state.map((conversation) => {
        if (conversation.title === title) {
          return { ...conversation, value }
        }
        return conversation
      })
    default:
      return state
  }
}
