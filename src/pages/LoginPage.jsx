import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import validator from 'validator';
import axios from "../axios";

export default function LoginPage() {
  const router = useHistory()
  const [user, setUser] = useState({ email: '', password: '' })

  const handleInput = (target, value) => {
    switch(target) {
      case 'email':
        setUser({ ...user, email: value })
        break
      case 'password':
        setUser({ ...user, password: value })
        break
    }
  }

  const handleSubmitButton = async () => {
    try {
      const errors = []
      if(!user.email)
        errors.push('Email cannot be empty')
      if(!validator.isEmail(user.email))
        errors.push('Input should be a valid email')
      if(!user.password)
        errors.push('Password cannot be empty')
      if(user.password.length < 6)
        errors.push('Passwords must have at least 6 characters')
      
      if(errors.length !== 0) {
        // * Error Validation Forms
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
        const { data: { accessToken } } = await axios({
          method:'POST',
          url: '/users/login',
          data: user
        })
        localStorage.setItem('access_token', accessToken) // * Set access_token in local storage
        router.push('/') // * Change into HomePage
      }
    } catch ({ response: { data: { message: errorMessage } } }) {
      // * Error from API Request to server
      Swal.fire({
        title: 'Oops...',
        icon: 'error',
        text: errorMessage
      })
    }
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 bg-info rounded p-4">
        <h3 className="text-center">Login User</h3>
        <div className="w-75 ml-5 pl-5">
          <div class="input-group mb-2 mt-4">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i className="fa fa-user-alt"></i>
              </div>
            </div>
            <input
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Email"
              required
              value={user.email}
              onChange={(e) => handleInput('email', e.target.value)}
            />
          </div>
          <div class="input-group mb-2 mt-4">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i className="fa fa-lock"></i>
              </div>
            </div>
            <input
              type="password"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Password"
              required
              value={user.password}
              onChange={(e) => handleInput('password', e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-primary" onClick={() => handleSubmitButton()}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
