import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import fetchUnit from '../hooks/fetchUnit'

export default function DashboardVendorPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const units = useSelector((state) => state.units)
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)
  const accessToken = localStorage.getItem('access_token')

  useEffect(() => {
    dispatch(fetchUnit(accessToken))
  }, [dispatch, accessToken])

  const switchPage = (page, unitId) => {
    if( page === 'addPage')
      history.push('/unit/add')
    if( page === 'detailPage')
      history.push(`/unit/${unitId}`)
  }


  return (
    <>
      <div className="container">
        <h1 className="text-center my-5 text-white">Choose your units</h1>
        <button className="btn btn-info m-5" onClick={() => switchPage('addPage')}>Add Unit</button>
        <div className="row">
          {units.map(unit => (
            <div className="col-3" key={unit._id}>
              <div className="card mb-3" style={{ width: '16rem', height: '30rem' }}>
                <img className="card-img-top" alt="unit-img" src={unit.imageUrl} style={{ width: '15rem', height: '15rem' }}></img>
                <div className="card-body">
                <h5 className="card-title">{unit.name}</h5>
                <h5 className="card-title">Rp. {unit.price}</h5>
                </div>
                <div className="card-body">
                  <button className="btn btn-primary" onClick={() => switchPage('detailPage')}>Detail</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}