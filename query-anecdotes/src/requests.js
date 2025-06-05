import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () =>
  await axios.get(baseUrl).then(res => res.data)

export const addAnecdote = async (newAnecdote) => 
  await axios.post(baseUrl, newAnecdote).then(res => res.data)

export const voteAnecdote = async (updatedAnecdote) => {
  return await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)
}