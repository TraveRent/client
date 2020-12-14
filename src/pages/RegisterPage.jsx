import React from "react";

export default function RegisterPage() {
  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 bg-info rounded p-4">
        <h3 className="text-center">Register</h3>
        <div className="d-flex justify-content-center">
          <div class="input-group mb-2 mt-4 mr-1">
            <input
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="First Name"
              required
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
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary px-4">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}
