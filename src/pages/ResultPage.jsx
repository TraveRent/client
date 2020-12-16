import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function ResultPage() {
  const router = useHistory();
  const [location, setLocation] = useState(router.location.state.location);
  const units = router.location.state.units;
  console.log(units);

  return (
    <div className="body">
      <div className="pt-5 row" style={{ minHeight: "88.7vh" }}>
        <div className="col-1"></div>
        <div className="col-3">
          <div className="card shadow">
            <div className="card-title pt-3 text-center">
              <input
                type="text"
                className="border-0 nunito rounded text-center"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="card-body m-0">
              <strong>Type</strong>
              <div className="border pl-1 mt-2 shadow">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customCheck1"
                  />
                  <label class="custom-control-label" for="customCheck1">
                    Automatic
                  </label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="customCheck2"
                  />
                  <label class="custom-control-label" for="customCheck2">
                    Manual
                  </label>
                </div>
              </div>
              <div className="mt-3">
                <strong>Category</strong>
                <div className="border pl-1 mt-2 shadow">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                    />
                    <label class="custom-control-label" for="customCheck1">
                      Car
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck2"
                    />
                    <label class="custom-control-label" for="customCheck2">
                      Motorcycle
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <strong>Brand</strong>
                <div className="border pl-1 mt-2 mb-4 shadow">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                    />
                    <label class="custom-control-label" for="customCheck1">
                      Suzuki
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck2"
                    />
                    <label class="custom-control-label" for="customCheck2">
                      Honda
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-7">
          <div className="card">
            {units.map((unit) => (
              <div className="card-body px-2 py-2 mx-3">
                <div className="row border rounded shadow">
                  <div className="col-4 p-0">
                    <img
                      className="img-fluid rounded"
                      src={unit.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="col-8 nunito d-flex justify-content-between">
                    <div className="">
                      <strong style={{ fontSize: "25px" }}>Honda Crv</strong>
                      <br />
                      <div className="ml-auto d-flex align-items-start flex-column">
                        <i
                          className="mb-1 fa fa-key"
                          style={{ fontSize: "15px" }}
                        >
                          Akbar Rental
                        </i>
                        <small className="p-1 bg-secondary text-white text-center rounded">
                          {unit.type + " " + unit.year}
                        </small>
                      </div>
                    </div>
                    <div class="d-flex align-items-start flex-column mt-3 mr-2">
                      <div className="mb-auto">
                        <strong>Rp. {unit.price} </strong>
                      </div>
                      <button className="btn bg-gold text-white mx-auto px-4 nunito mb-2">
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
