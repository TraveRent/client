import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import fetchUnit from '../hooks/fetchUnit'
import { setLoading } from "../store/actions"
import deleteUnitById from '../hooks/deleteUnit'
import { VendorUnit } from '../components'
import Swal from 'sweetalert2'


export default function DashboardVendorPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { units, loading, error } = useSelector((state) => state)
  const accessToken = localStorage.getItem('access_token')

  useEffect(() => {
    dispatch(fetchUnit(accessToken));
  }, [dispatch, accessToken]);

  const switchPage = (page, unitId) => {
    console.log(page)
    if( page === 'addPage')
      history.push('/unit/add')
    if( page === 'editPage') {
      dispatch(setLoading())
      history.push(`/unit/edit/${unitId}`)
    }
  }

  const alertDeleteUnitById = id => {
    Swal.fire({
      title: 'Are you sure you want to delete unit?',
      icon: 'question',
      showCancelButton: true,
      reverseButtons: true
    })
      .then(({ isConfirmed }) => {
        if(isConfirmed) {
          dispatch(deleteUnitById(id))
        }
      })
  }

  if(loading) return (
    <>
      <div className="container text-center mt-5">
        <h1>Loading....</h1>
      </div>
    </>
  )

  return (
    <>
      <div className="body">
        <div className="pt-5 pb-5 row" style={{ minHeight: "88.7vh" }}>
          <div className="col-1"></div>
          <div className="col-3">
            <div className="card shadow">
              <div className="card-title russo-one pt-3 text-center">
                <h4>Dashboard</h4>
                <hr />
                <h4>Hello, Akbar Rental!</h4>
              </div>
              <button
                onClick={() => switchPage("addPage")}
                className="btn bg-gold mb-2 nunito mx-2 regbtn"
              >
                Add Unit
              </button>
            </div>
          </div>
          <div className="col-7">
            <div className="card">
              {units.map(unit => <VendorUnit unit={unit} key={unit._id} switchPage={switchPage} alertDeleteUnitById={alertDeleteUnitById} /> )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
