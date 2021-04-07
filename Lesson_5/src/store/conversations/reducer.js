import { ADD_CONVERSATION } from "./types"

const initialState = [
  { title: "room1", value: "", lastMessage: {} },
  { title: "room2", value: "", lastMessage: {} },
]

export const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONVERSATION:
      return [...state, { title: action.payload, value: "", lastMessage: "" }]

    default:
      return state
  }
}
