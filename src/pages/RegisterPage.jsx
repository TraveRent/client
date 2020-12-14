import React from "react";

export default function RegisterPage() {
  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 bg-info rounded p-4">
        <h3 className="text-center">Login</h3>
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
            />
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
