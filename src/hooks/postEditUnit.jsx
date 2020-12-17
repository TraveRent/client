import axios from '../axios'
import { setEditedUnit, setError } from '../store/actions'

export default function postEditUnit(editedUnit, accessToken) {
  return dispatch => {
    axios({
      method: 'PUT',
      url: `/units/${editedUnit._id}`,
      headers: { 'vendor_access_token': accessToken },
      data: editedUnit
    })
      .then(() => dispatch(setEditedUnit(editedUnit)))
      .catch((err) => dispatch(setError(err)))
  }
}