import axios from '../axios'
import { setOrders, setError, setLoading } from '../store/actions'

export default function fetchOrder() {
  const accessToken = localStorage.getItem('access_token')
  return dispatch => {
    axios({
      url: '/orders',
      method: 'GET',
      headers: { 'access_token': accessToken }
    })
    .then(({ data }) => {
      dispatch(setOrders(data))
    })
    .catch(err => {
      dispatch(setError(err))
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
  }
}