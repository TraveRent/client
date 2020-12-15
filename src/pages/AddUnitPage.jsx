import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isURL } from 'validator'
import addUnit from '../hooks/addUnit'

export default function AddUnitPage() {
  const accessToken = localStorage.getItem('access_token')
  const vendorId = localStorage.getItem('id')
  const history = useHistory()
  const dispatch = useDispatch()
  const [newUnit, setNewUnit] = useState({
    name: '',
    brand: '',
    type: '',
    year: 0,
    category: '',
    imageUrl: '',
    location: '',
    price: ''
  })

  const handleInput = (target, value) => {
    switch(target) {
      case 'name':
        setNewUnit({ ...newUnit, name: value })
        break
      case 'brand':
        setNewUnit({ ...newUnit, brand: value })
        break
      case 'type':
        setNewUnit({ ...newUnit, type: value })
        break
      case 'year':
        setNewUnit({ ...newUnit, year: value })
        break
      case 'category':
        setNewUnit({ ...newUnit, category: value })
        break
      case 'imageUrl':
        setNewUnit({ ...newUnit, imageUrl: value })
        break
      case 'location':
        setNewUnit({ ...newUnit, location: value })
        break
      case 'price':
        setNewUnit({ ...newUnit, price: value })
        break
      default:
        setNewUnit(newUnit)
        break
    }
  }

  const handleSubmit = (event) => {
      event.preventDefault()
      // console.log(newUnit)
      const errors = []
      if(!newUnit.name)
        errors.push('Name cannot be empty')
      if(!newUnit.brand)
        errors.push('Brand cannot be empty')
      if(!newUnit.type)
        errors.push('Type cannot be empty')
      if(!newUnit.year)
        errors.push('Year cannot be empty')
      if(!newUnit.category)
        errors.push('Category cannot be empty')
      if(!newUnit.imageUrl)
        errors.push('Image URL cannot be empty')
      if(!isURL(newUnit.imageUrl))
        errors.push('Invalid image url')
      if(!newUnit.location)
        errors.push('Location cannot be empty')
      if(!newUnit.price)
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
        // console.log(newUnit, 'ini masuk')
        dispatch(addUnit(newUnit, accessToken))
        history.push('/dashboard')
      }
  }


  return (
    <>
      <h1 className="text-white text-center">Please fill this form for add your unit</h1>
      <div className="container d-flex">
        <div className="col-6">
          <img src={newUnit.imageUrl} alt=""/>
        </div>
        <div className="col-6 border border-dark">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="e.g. Avanza"
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