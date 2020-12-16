import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Toast from "../sweetalert2/toast";

export default function ResultPage() {
  const router = useHistory();
  const [location, setLocation] = useState(router.location.state.location);
  const units = router.location.state.units;

  const toProfilePage = () => {
    if (!localStorage.getItem("access_token")) {
      Toast.fire({
        title: "Please login first",
        icon: "error",
        showConfirmButton: false,
      });
    } else {
      router.push("/profile");
    }
  };

  return (
    <div className="body">
      <div className="pt-5 row pb-5" style={{ minHeight: "88.7vh" }}>
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
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Automatic
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck2"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck2"
                  >
                    Manual
                  </label>
                </div>
              </div>
              <div className="mt-3">
                <strong>Category</strong>
                <div className="border pl-1 mt-2 shadow">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck3"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck3"
                    >
                      Car
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck4"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck4"
                    >
                      Motorcycle
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <strong>Brand</strong>
                <div className="border pl-1 mt-2 mb-4 shadow">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck5"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck5"
                    >
                      Suzuki
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck6"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck6"
                    >
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
                      <strong style={{ fontSize: "25px" }}>
                        {unit.brand + " " + unit.name}
                      </strong>
                      <br />
                      <div className="ml-auto d-flex align-items-start flex-column">
                        <i
                          className="mb-1 fa fa-key"
                          style={{ fontSize: "15px" }}
                        >
                          {unit.vendor.email}
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

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModalLong"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-center"
                id="exampleModalLongTitle"
              >
                Syarat dan Ketentuan
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                risus, porta ac consectetur ac, vestibulum at eros. Praesent
                commodo cursus magna, vel scelerisque nisl consectetur et.
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor. Aenean lacinia bibendum nulla sed consectetur. Praesent
                commodo cursus magna, vel scelerisque nisl consectetur et. Donec
                sed odio dui. Donec ullamcorper nulla non metus auctor
                fringilla. Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                dolor auctor. Aenean lacinia bibendum nulla sed consectetur.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor
                fringilla. Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                dolor auctor. Aenean lacinia bibendum nulla sed consectetur.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor
                fringilla. Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                dolor auctor. Aenean lacinia bibendum nulla sed consectetur.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor
                fringilla. Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                dolor auctor. Aenean lacinia bibendum nulla sed consectetur.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor
                fringilla. Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                dolor auctor. Aenean lacinia bibendum nulla sed consectetur.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor
                fringilla.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={toProfilePage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
