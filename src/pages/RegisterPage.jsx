import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import validator from "validator";
import Swal from "sweetalert2";
import axios from "../axios";
import Toast from "../sweetalert2/toast";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const router = useHistory();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [newUserStatus, setStatus] = useState("");

  const handleInput = (target, value) => {
    switch (target) {
      case "firstName":
        setNewUser({ ...newUser, firstName: value });
        break;
      case "lastName":
        setNewUser({ ...newUser, lastName: value });
        break;
      case "email":
        setNewUser({ ...newUser, email: value });
        break;
      case "password":
        setNewUser({ ...newUser, password: value });
        break;
      case "status":
        setStatus(value);
        break;
      default:
        setNewUser(newUser);
        break;
    }
  };

  const handleSubmitButton = async () => {
    try {
      const errors = [];
      if (!newUser.firstName) errors.push("First Name cannot be empty");
      if (!newUser.email) errors.push("Email cannot be empty");
      if (!validator.isEmail(newUser.email))
        errors.push("Input should be a valid email");
      if (!newUser.password) errors.push("Password cannot be empty");
      if (newUser.password.length < 6)
        errors.push("Passwords must have at least 6 characters");
      if (!newUserStatus) errors.push("Please select your type account");

      if (errors.length !== 0) {
        // * Error Validation Forms
        Swal.fire({
          title: "Oops...",
          icon: "error",
          html: `
          <div class="ml-5 text-left">
            ${errors.join("<br/>")}
          </div>
          `,
        });
      } else {
        if (newUserStatus === "User") {
          // console.log(newUser, 'ini user')
          const {
            data: { email },
          } = await axios({
            method: "POST",
            url: "/users/register",
            data: newUser,
          });
          Toast.fire({
            title: "Yay!",
            icon: "success",
            text: `Successfully registered ${email}`,
          });
          router.push("/login");
        } else {
          const {
            data: { email },
          } = await axios({
            method: "POST",
            url: "/vendors/register",
            data: newUser,
          });
          Toast.fire({
            title: "Yay!",
            icon: "success",
            text: `Successfully registered ${email}`,
          });
          router.push("/login");
        }
      }
    } catch ({
      response: {
        data: { message: errorMessage },
      },
    }) {
      // * Error from API Request to server
      Swal.fire({
        title: "Oops...",
        icon: "error",
        text: errorMessage,
      });
    }
  };

  return (
    <>
      <div className="row bg-blue-dark nunito" style={{ minHeight: "88.7vh" }}>
        <div className="col-5 russo-one ">
          <div className="mt-5 display-2 ml-5 pt-5 text-white">Register</div>
          <div className="ml-4 pl-3">
            <p class="ml-3 text-secondary">
              Already have an account? <Link to="/login">Login here.</Link>
            </p>
          </div>
        </div>
        <div className="col-7 pt-3 px-5">
          <div className="card shadow-lg bg-card2">
            <div className="rounded">
              <div className="px-auto pt-5 pb-5 mx-4">
                <div class="input-group mb-2 mt-4">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i className="fa p-auto fa-address-card"></i>
                    </div>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                    required
                    value={newUser.firstName}
                    onChange={(e) => handleInput("firstName", e.target.value)}
                  />
                </div>
                <div class="input-group mb-2 mt-4">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i className="fa p-auto fa-id-card"></i>
                    </div>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    required
                    value={newUser.lastName}
                    onChange={(e) => handleInput("lastName", e.target.value)}
                  />
                </div>
                <div class="input-group mb-2 mt-4">
                  <div class="input-group-prepend">
                    <div class="input-group-text">@</div>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    required
                    value={newUser.email}
                    onChange={(e) => handleInput("email", e.target.value)}
                  />
                </div>
                <div class="input-group mb-2 mt-4">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i className="fa fa-lock p-auto"></i>
                    </div>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    required
                    value={newUser.password}
                    onChange={(e) => handleInput("password", e.target.value)}
                  />
                </div>
                <div className="text-center text-secondary py-2">
                  <h5>
                    <strong>Register as</strong>
                  </h5>
                </div>
                <div className="row mx-3">
                  <div class="col-6 input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <input
                          type="radio"
                          name="category"
                          aria-label="Radio button for following text input"
                          value="Vendor"
                          onClick={(e) => handleInput("status", e.target.value)}
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Text input with radio button"
                      disabled
                      value="Vendor"
                    />
                  </div>

                  <div class="col-6 input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <input
                          type="radio"
                          value="User"
                          name="category"
                          onClick={(e) => handleInput("status", e.target.value)}
                          aria-label="Radio button for following text input"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Text input with radio button"
                      disabled
                      value="User"
                    />
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <button className="btn bg-gold mt-4 px-5 regbtn" onClick={handleSubmitButton}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Register&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
