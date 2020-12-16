import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import fetchUnit from '../hooks/fetchUnit'
import { setLoading } from "../store/actions"


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
              {units.map(unit => {
                return (
                  <div className="card-body px-2 py-2 mx-3">
                    <div className="row border rounded shadow">
                      <div className="col-4 p-0">
                        <img
                          className="img-fluid rounded"
                          src={unit.imageUrl}
                          alt={'Gambar' + unit.name}
                        />
                      </div>
                      <div className="col-8 nunito d-flex justify-content-between">
                        <div className="">
                          <strong style={{ fontSize: "25px" }}>{unit.name}</strong>
                          <br />
                          <div className="ml-auto d-flex align-items-start flex-column">
                            <i
                              className="mb-1 fa fa-key"
                              style={{ fontSize: "15px" }}
                            >
                              {unit.vendor.email}
                            </i>
                            <small className="p-1 bg-secondary text-white text-center rounded">
                              {unit.type + ' ' + unit.year}
                            </small>
                          </div>
                        </div>
                        <div class="d-flex align-items-start flex-column mt-3 mr-2">
                          <div className="mb-auto">
                            <strong>Rp. {unit.price}</strong>
                          </div>
                          <div class="d-flex justify-content-between">
                            <i
                              onClick={() => switchPage('editPage', unit._id)}
                              className="click fa fa-edit mx-1 mb-2 bg-gold py-1 px-2 text-white rounded"
                            >
                              {" "}
                              Edit
                            </i>
                            <i
                              onClick={() => console.log}
                              className="click fa fa-trash mx-1 mb-2 bg-danger py-1 px-2 text-white rounded"
                            >
                              {" "}
                              Delete
                            </i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
