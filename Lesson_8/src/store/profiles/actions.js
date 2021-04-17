import {
  GET_PROFILE_ERROR,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_PENDING,
} from "./types"

export const getProfileByUserName = (name) => async (
  dispatch,
  getState,
  request,
) => {
  dispatch({ type: GET_PROFILE_PENDING })
  try {
    const { data } = await request.get(`/profiles/${name}`)
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data })
  } catch {
    dispatch({ type: GET_PROFILE_ERROR })
  }
}
