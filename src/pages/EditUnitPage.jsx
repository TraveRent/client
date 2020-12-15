import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import fetchUnitById from '../hooks/fetchUnitById'
import { isURL } from 'validator'
import Swal from 'sweetalert2'

export default function EditUnitPage() {
  const history = useHistory()
  const accessToken = localStorage.getItem('access_token')
  const { id } = useParams()
  const dispatch = useDispatch()
  const unit = useSelector((state) => state.unit)
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)
  const [updatedUnit, setUpdateUnit] = useState({})

// ! edit issue
  useEffect(() => {
    dispatch(fetchUnitById(id))
    if(!loading)
    setUpdateUnit({ ...unit })
  }, [dispatch, id])

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
      errors.push('Name cannot be empty')
    if(!updatedUnit.brand)
      errors.push('Brand cannot be empty')
    if(!updatedUnit.type)
      errors.push('Type cannot be empty')
    if(!updatedUnit.year)
      errors.push('Year cannot be empty')
    if(!updatedUnit.category)
      errors.push('Category cannot be empty')
    if(!updatedUnit.imageUrl)
      errors.push('Image URL cannot be empty')
    if(!isURL(updatedUnit.imageUrl))
      errors.push('Invalid image url')
    if(!updatedUnit.location)
      errors.push('Location cannot be empty')
    if(!updatedUnit.price)
      errors.push('Price cannot be empty')


    if(errors.length !== 0) {
      Swal.fire({
        title: 'Oops...',
        icon: 'error',
        html: `
        <div class="ml-5 text-left">
          ${errors.join('<br/>')}
        </div>
        `
      })
    } else {
      // console.log(unit, 'ini masuk')
      // dispatch(addUnit(newUnit, accessToken))
      // history.push('/dashboard')
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
              onChange={(e) => handleInput('type', e.target.value)}  
            />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="e.g. 2019"
              onChange={(e) => handleInput('year', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="e.g. Car"
              onChange={(e) => handleInput('category', e.target.value)}  
            />
          </div>
          <div className="form-group">
            <label>Image Url</label>
            <input
              type="url"
              className="form-control"
              id="image_url"
              placeholder="e.g. http://arah.in/adidas-neo"
              onChange={(e) => handleInput('imageUrl', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="e.g. Jakarta"
              onChange={(e) => handleInput('location', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              placeholder="e.g. 450000"
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