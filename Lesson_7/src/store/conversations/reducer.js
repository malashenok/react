import { createReducer } from "../../utils/create-reducer"
import { ADD_CONVERSATION, CHANGE_VALUE, DELETE_CONVERSATION } from "./types"

const initialState = {
  conversations: [{ title: "room1", value: "" }],
  conversationsPending: true,
}

export const conversationsReducer = createReducer(initialState, {
  [ADD_CONVERSATION]: (state, { payload }) => {
    if (
      state.conversations.findIndex((e) => e.title === payload.title) !== -1
    ) {
      return {
        ...state,
        conversations: state.conversations.filter(
          (conversation) => conversation.title !== payload.title,
        ),
      }
    } else {
      return {
        ...state,
        conversations: [
          ...state.conversations,
          { title: payload.title, value: "" },
        ],
      }
    }
  },

  [CHANGE_VALUE]: (state, { payload }) => ({
    ...state,
    conversations: state.conversations.map((conversation) =>
      conversation.title === payload.title
        ? { ...conversation, value: payload.value }
        : conversation,
    ),
  }),

  [DELETE_CONVERSATION]: (state, { payload }) => ({
    ...state,
    conversations: state.conversations.filter(
      (conversation) => conversation.title !== payload.title,
    ),
  }),
})
