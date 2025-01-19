import * as React from 'react'

type Status = 'idle' | 'pending' | 'resolved' | 'rejected'
interface State<T> {
  status: Status
  data: T | null
  error: unknown
}
const useAsync = function useAsync<T>(
  initialState: State<T> = { status: 'idle', data: null, error: null }
) {
  const [{ status, data, error }, setState] = React.useReducer(
    (state: State<T>, action: Partial<State<T>>) => ({ ...state, ...action }),
    initialState
  )

  const setData = (data: T) => setState({ data, status: 'resolved' })
  const setError = (error: unknown) => setState({ error, status: 'rejected' })

  const run = React.useCallback((promise: Promise<T>) => {
    if (!promise || !promise.then) {
      throw new Error(
        `The argument passed to useAsync().run must be a promise. You passed: ${promise}`
      )
    }
    setState({ status: 'pending' })
    return promise.then(
      (data) => {
        setData(data)
        return data
      },
      (error) => {
        setError(error)
        return Promise.reject(error)
      }
    )
  }, [])

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',
    error,
    status,
    data,
    run
  }
}

export default useAsync
