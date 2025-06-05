import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
  }

  return (
    <div style={{marginBottom : 10}}>
      filter <input type="text" name="filtertex" 
        onChange={handleChange}/>
    </div>
  )
}

export default AnecdoteFilter