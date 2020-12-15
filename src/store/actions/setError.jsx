export default function setError(err) {
  return { type: 'SET_ERROR', payload: err }
}