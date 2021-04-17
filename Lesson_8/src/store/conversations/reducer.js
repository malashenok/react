import { createReducer } from "../../utils/create-reducer"
import {
  ADD_CONVERSATION,
  CHANGE_VALUE,
  DELETE_CONVERSATION,
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_ERROR,
  GET_CONVERSATION_PENDING,
} from "./types"

const initialState = {
  conversations: [],
  conversationsPending: false,
  error: null,
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
  [GET_CONVERSATION_PENDING]: (state) => ({
    ...state,
    conversationsPending: true,
  }),
  [GET_CONVERSATION_SUCCESS]: (state, { payload }) => ({
    ...state,
    conversations: payload,
    conversationsPending: false,
  }),
  [GET_CONVERSATION_ERROR]: (state, { payload }) => ({
    ...state,
    conversationsPending: false,
    error: payload,
  }),
})
