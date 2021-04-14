import { createReducer } from "../../utils/create-reducer"
import { ADD_CONVERSATION, CHANGE_VALUE, DELETE_CONVERSATION } from "./types"

const initialState = [
  { title: "room1", value: "" },
  { title: "room2", value: "" },
]

export const conversationsReducer = createReducer(initialState, {
  [ADD_CONVERSATION]: (state, { payload }) => {
    if (state.findIndex((e) => e.title === payload.title) !== -1) {
      return state.filter(
        (conversation) => conversation.title !== payload.title,
      )
    } else {
      return [...state, { title: payload.title, value: "" }]
    }
  },

  [CHANGE_VALUE]: (state, { payload }) => {
    return state.map((conversation) =>
      conversation.title === payload.title
        ? { ...conversation, value: payload.value }
        : conversation,
    )
  },

  [DELETE_CONVERSATION]: (state, { payload }) => {
    return state.filter((conversation) => conversation.title !== payload.title)
  },
})
