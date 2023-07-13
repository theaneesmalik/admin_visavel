import { useEffect, useReducer } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const initialState = {
  data: {},
  error: null,
  loading: true,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST':
      return { ...state, loading: true }
    case 'SUCCESS':
      return { ...state, loading: false, data: action.payload }
    case 'ERROR':
      return { ...state, loading: false, error: action.payload }
    default:
      throw new Error(`Invalid action type: ${action.type}`)
  }
}

const useFetch = (url, method = 'GET', body = null) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'REQUEST' })
      try {
        const requestOptions = {
          method,
          url,
          data: body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminAuthToken')}`,
          },
        }

        const response = await axios.request(requestOptions)
        // console.log(response)
        dispatch({ type: 'SUCCESS', payload: response?.data })
      } catch (error) {
        console.log(error)
        const err = error.response.data.message === 'Invalid / Expired token'
        if (err) {
          navigate('/login')
          localStorage.clear()
        }
        dispatch({ type: 'ERROR', payload: error })
      }
    }

    fetchData()
  }, [url])

  return state
}

export default useFetch
