export default function setLoading( loading = true) {
  return { type: 'SET_LOADING', payload: loading }
}