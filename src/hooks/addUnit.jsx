import axios from '../axios'
import { setNewUnit, setError, setLoading } from '../store/actions'

export default function addUnit(newUnit, accessToken) {
  return dispatch => {
    axios({
      url: '/units/add',
      method: 'POST',
      headers: { 'vendor_access_token': accessToken },
      data: newUnit
    })
    .then(({ data }) => {
      console.log(data, 'yay');
      dispatch(setNewUnit(data))
    })
    .catch(err => {
      console.log(err, 'oops');
      dispatch(setError(err))
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
  }
}
