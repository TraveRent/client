import axios from '../axios'
import { deleteUnit, setError, setLoading } from '../store/actions'


export default function deleteUnitById(id) {
  const accessToken = localStorage.getItem('access_token')
  return dispatch => {
    axios({
      url: `/units/${id}`,
      method: 'DELETE',
      headers: { 'access_token': accessToken}
    })
    .then(({ data }) => {
      dispatch(deleteUnit(id))
    })
    .catch(err => {
      dispatch(setError(err))
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
  }
}