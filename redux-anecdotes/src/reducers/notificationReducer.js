import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      return action.payload
    },
    reset: () => ''
  }
})

export const { notify, reset } = notificationSlice.actions

export const notification = (message, seconds) => {
  return dispatch => {
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(reset())
    }, seconds * 1000)
  }
}
export default notificationSlice.reducer