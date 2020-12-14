import React from "react";

export default function HomePage() {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center shadow-lg">
        <div className="w-75 bg-info shadow-lg p-3">
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i className="fa fa-search-location"></i>
              </div>
            </div>
            <input
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="Bali"
              required
            />
          </div>
          <div className="mt-3">
            <div class="form-row align-items-center">
              <div class="col-auto">
                <label for="inlineFormInput">Start Date</label>
                <input
                  type="date"
                  class="form-control mb-2"
                  id="inlineFormInput"
                />
              </div>
              <div class="col-auto">
                <label for="inlineFormInputGroup">End Date</label>
                <div class="input-group mb-2">
                  <input
                    type="date"
                    class="form-control"
                    id="inlineFormInputGroup"
                  />
                </div>
              </div>
              <div className="col-auto">
                <button className="btn btn-primary ml-5 mt-4">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
