import { createContext, useReducer, useEffect, useRef } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  const timeoutRef = useRef(null)

  // Set up the effect to clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    }

    // Clean up the timeout when component unmounts or notification changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [notification])

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext