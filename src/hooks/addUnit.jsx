import axios from '../axios'
import { setNewUnit, setError, setLoading } from '../store/actions'

export default function addUnit(newUnit, accessToken) {
  return dispatch => {
    axios({
      url: '/units/add',
      method: 'POST',
      headers: { 'access_token': accessToken },
      data: newUnit
    })
    .then(({ data }) => {
      dispatch(setNewUnit(data))
    })
    .catch(err => {
      dispatch(setError(err))
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
  }
}
