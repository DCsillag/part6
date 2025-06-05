import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote)
    const filter = useSelector(state => state.filter)
    
    const filteredAndSortedAnecdotes = useMemo(() => {
        return [...anecdotes]
            .filter(anecdote => 
                anecdote.content.toLowerCase().includes(filter.toLowerCase())
            )
            .sort((a, b) => b.votes - a.votes)
    }, [anecdotes, filter])

    const dispatch = useDispatch()

    const handleVote = (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(notification(`You voted for ${anecdote.content}`, 5))
    }
    
    return (
        <>
            {filteredAndSortedAnecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AnecdoteList