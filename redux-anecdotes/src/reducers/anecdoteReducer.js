import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
// const initialState = anecdotesAtStart.map(asObject) 

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers:{
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) { 
      const updatedAnecdote = action.payload
      return state.map(anecdote => 
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { addAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initialise = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addAnecdote(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer