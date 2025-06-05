import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAll, voteAnecdote } from './requests'

import { useNotificationDispatch } from './components/notificationHooks'

const App = () => {

  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const currentAnecdotes = queryClient.getQueryData(['anecdotes'])

      const updatedAnecdotes = currentAnecdotes.map(anecdote => 
        anecdote.id === updatedAnecdote.id ? {...anecdote, votes: anecdote.votes + 1} : anecdote
      )

      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    notificationDispatch({type: 'NOTIFY', payload: `Voted for ${anecdote.content}`})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1,
  })

  if (result.isLoading) {
    return <div>Loading Data</div>
  }

  if (result.isError) {
    return <p>anecdote service not available due to problems in server</p>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
