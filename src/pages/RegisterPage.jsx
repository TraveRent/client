import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import Swal from 'sweetalert2';
import axios from '../axios';
import Toast from '../sweetalert2/toast'

export default function RegisterPage() {
  const router = useHistory()
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', })

  const handleInput = (target, value) => {
    switch(target) {
      case 'firstName':
        setNewUser({ ...newUser, firstName: value })
        break
      case 'lastName':
        setNewUser({ ...newUser, lastName: value })
        break
      case 'email':
        setNewUser({ ...newUser, email: value })
        break
      case 'password':
        setNewUser({ ...newUser, password: value })
        break
      default:
        setNewUser(newUser)
        break
    }
  }

  const handleSubmitButton = async () => {
    try {
      const errors = []
      if(!newUser.firstName)
        errors.push('First Name cannot be empty')
      if(!newUser.email)
        errors.push('Email cannot be empty')
      if(!validator.isEmail(newUser.email))
        errors.push('Input should be a valid email')
      if(!newUser.password)
        errors.push('Password cannot be empty')
      if(newUser.password.length < 6)
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
        const { data: { email } } = await axios({
          method: 'POST',
          url: '/users/register',
          data: newUser
        })
        Toast.fire({
          title: 'Yay!',
          icon: 'success',
          text: `Successfully registered ${email}`
        })
        router.push('/login')
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
        <h3 className="text-center">Register User</h3>
        <div className="w-75 ml-5 pl-5">
          <div class="input-group mb-2 mt-4">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i className="fa fa-address-card"></i>
              </div>
            </div>
            <input
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="First Name"
              required
              value={newUser.firstName}
              onChange={(e) => handleInput('firstName', e.target.value)}
            />
          </div>
          <div class="input-group mb-2 mt-4">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i className="fa fa-id-card"></i>
              </div>
            </div>
            <input
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Last Name"
              required
              value={newUser.lastName}
              onChange={(e) => handleInput('lastName', e.target.value)}
            />
          </div>
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
              placeholder="First Name"
              required
              value={newUser.email}
              onChange={(e) => handleInput('email', e.target.value)}
            />
          </div>
          <div class="input-group mb-2 mt-4">
            <input
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Last Name"
              required
            />
          </div>
        </div>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">@</div>
          </div>
          <input
            type="text"
            class="form-control"
            id="inlineFormInputGroup"
            placeholder="Email"
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <div class="input-group mb-2">
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
              value={newUser.password}
              onChange={(e) => handleInput('password', e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-primary" onClick={() => handleSubmitButton()}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}
