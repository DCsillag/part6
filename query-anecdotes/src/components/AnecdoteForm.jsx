import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAnecdote } from "../requests"

import { useNotificationDispatch } from './notificationHooks'

const AnecdoteForm = () => {

  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
      notificationDispatch({type: 'NOTIFY', payload: `Added ${newAnecdote.content}`})
    },
    onError:(error) => {
      const errorMessage = error.response?.data?.error || 'Failed to add anecdote'
      notificationDispatch({type: 'NOTIFY', payload: errorMessage})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
