import axios from '../axios'
import { setNewOrder, setError, setLoading } from '../store/actions'

export default function saveNewOrder(newOrder) {
  const accessToken = localStorage.getItem('access_token')
  return dispatch => {
    axios({
      url: '/orders',
      method: 'POST',
      headers: { 'access_token': accessToken },
      data: newOrder
    })
    .then(({ data }) => {
      dispatch(setNewOrder(data))
    })
    .catch(err => {
      dispatch(setError(err))
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
  }
}