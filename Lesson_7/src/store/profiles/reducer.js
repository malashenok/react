import { createReducer } from "../../utils/create-reducer"
import {
  GET_PROFILE_ERROR,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_PENDING,
} from "./types"

const initialState = {
  profiles: {},
  profilesPending: false,
  error: null,
}

export const profilesReducer = createReducer(initialState, {
  [GET_PROFILE_PENDING]: (state) => ({
    ...state,
    profilesPending: true,
  }),
  [GET_PROFILE_SUCCESS]: (state, { payload }) => ({
    ...state,
    profiles: payload,
    profilesPending: false,
  }),
  [GET_PROFILE_ERROR]: (state, { payload }) => ({
    ...state,
    profilesPending: false,
    error: payload,
  }),
})
