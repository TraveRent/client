import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import fetchUnitById from '../hooks/fetchUnitById'
import postEditUnit from '../hooks/postEditUnit'
import { isURL } from 'validator'
import Swal from 'sweetalert2'

export default function EditUnitPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const { unit, loading, error } = useSelector(state => state)
  const [updatedUnit, setUpdateUnit] = useState({})
  const accessToken = localStorage.getItem('access_token')

  useEffect(() => {
    if(loading)
      dispatch(fetchUnitById(id))
    else
      setUpdateUnit(unit)
  }, [loading])

  const handleInput = (target, value) => {
    switch(target) {
      case 'name':
        setUpdateUnit({ ...updatedUnit, name: value })
        break
      case 'brand':
        setUpdateUnit({ ...updatedUnit, brand: value })
        break
      case 'type':
        setUpdateUnit({ ...updatedUnit, type: value })
        break
      case 'year':
        setUpdateUnit({ ...updatedUnit, year: value })
        break
      case 'category':
        setUpdateUnit({ ...updatedUnit, category: value })
        break
      case 'imageUrl':
        setUpdateUnit({ ...updatedUnit, imageUrl: value })
        break
      case 'location':
        setUpdateUnit({ ...updatedUnit, location: value })
        break
      case 'price':
        setUpdateUnit({ ...updatedUnit, price: value })
        break
      default:
        setUpdateUnit(updatedUnit)
        break
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log(newUnit)
    const errors = []
    if(!updatedUnit.name)
      errors.push('Name')
    if(!updatedUnit.brand)
      errors.push('Brand')
    if(!updatedUnit.type)
      errors.push('Type')
    if(!updatedUnit.year)
      errors.push('Year')
    if(!updatedUnit.category)
      errors.push('Category')
    if(!updatedUnit.imageUrl)
      errors.push('Image URL')
    if(!isURL(updatedUnit.imageUrl))
      errors.push('Invalid image url')
    if(!updatedUnit.location)
      errors.push('Location')
    if(!updatedUnit.price)
      errors.push('Price')


    if(errors.length !== 0) {
      Swal.fire({
        title: 'Oops...',
        icon: 'error',
        text: `Forms ${errors.join(', ')} cannot be empty`
      })
    } else {
      dispatch(postEditUnit(updatedUnit, accessToken))
      history.push('/dashboard')
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
      <h1 className="text-center">Edit your unit here...</h1>
      <div className="container d-flex mt-5">
        <div className="col-8">
          <img src={unit.imageUrl} alt="unit-img" style={{ width: '40rem', height: '30rem' }}/>
        </div>
        <div className="col-4 border border-dark">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="e.g. Avanza"
              value={updatedUnit.name}
              onChange={(e) => handleInput('name', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="e.g. Toyota"
              value={updatedUnit.brand}
              onChange={(e) => handleInput('brand', e.target.value)}  
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="e.g. Automatic"
              value={updatedUnit.type}
              onChange={(e) => handleInput('type', e.target.value)}  
            />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input
              type="number"
              className="form-control"
              id="productName"
              placeholder="e.g. 2019"
              value={updatedUnit.year}
              onChange={(e) => handleInput('year', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select class="custom-select" value={updatedUnit.category} onChange={(e) => handleInput('category', e.target.value)}>
              <option disabled>-- Select Category --</option>
              <option value="Car">Car</option>
              <option value="Motorcycle">Motorcycle</option>
            </select>
            {/* <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="e.g. Car"
              value={updatedUnit.category}
              onChange={(e) => handleInput('category', e.target.value)}  
            /> */}
          </div>
          {/* <div className="form-group">
            <label>Image Url</label>
            <input
              type="url"
              className="form-control"
              id="image_url"
              placeholder="e.g. http://arah.in/adidas-neo"
              onChange={(e) => handleInput('imageUrl', e.target.value)}
            />
          </div> */}
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="e.g. Jakarta"
              value={updatedUnit.location}
              onChange={(e) => handleInput('location', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="e.g. 450000"
              value={updatedUnit.price}
              onChange={(e) => handleInput('price', e.target.value)}  
            />
          </div>
            <button type="submit" className="btn btn-primary form-control my-3">Submit</button>
        </form>
            <button type="submit" className="btn btn-primary form-control">Cancel</button>
        </div>
      </div>
    </>
  )
}