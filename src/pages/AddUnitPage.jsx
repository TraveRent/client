import React, { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { isURL } from "validator";
import addUnit from "../hooks/addUnit";

export default function AddUnitPage() {
  const accessToken = localStorage.getItem("vendor_access_token");
  const vendorId = localStorage.getItem("id");
  const history = useHistory();
  const dispatch = useDispatch();
  const [newUnit, setNewUnit] = useState({
    name: "",
    brand: "",
    type: "",
    year: 0,
    category: "",
    imageUrl: "",
    location: "",
    price: "",
  });

  const handleInput = (target, value) => {
    switch (target) {
      case "name":
        setNewUnit({ ...newUnit, name: value });
        break;
      case "brand":
        setNewUnit({ ...newUnit, brand: value });
        break;
      case "type":
        setNewUnit({ ...newUnit, type: value });
        break;
      case "year":
        setNewUnit({ ...newUnit, year: value });
        break;
      case "category":
        setNewUnit({ ...newUnit, category: value });
        break;
      case "imageUrl":
        setNewUnit({ ...newUnit, imageUrl: value });
        break;
      case "location":
        setNewUnit({ ...newUnit, location: value });
        break;
      case "price":
        setNewUnit({ ...newUnit, price: value });
        break;
      default:
        setNewUnit(newUnit);
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(newUnit)
    const errors = [];
    for (const form in newUnit) {
      console.log(form, '???');
      console.log(newUnit[form]);
      if(!newUnit[form])
        errors.push(`${form[0].toUpperCase()} + ${form.substring(1)}`)
    }

    if (errors.length !== 0) {
      Swal.fire({
        title: "Oopss...",
        text: `Forms ${errors.join(", ")} cannot be empty!`,
        icon: "error",
      });
    } else {
      const fd = new FormData()
      for(const key in newUnit) {
        if(key === "imageUrl")
          fd.append('image-unit', newUnit[key][0])
        fd.append(key, newUnit[key])
      }
      dispatch(addUnit(fd, accessToken));
      history.push("/dashboard");
    }
  };

  return (
    <>
      <div className="body">
        <div className="pt-5 row" style={{ minHeight: "88.7vh" }}>
          <div className="col-1"></div>
          <div className="col-3">
            <div className="card shadow bg-card2 text-white">
              <div className="card-title russo-one pt-3 text-center">
                <h4>Add Unit</h4>
                <hr />
              </div>
              <button className="btn bg-gold mb-3 nunito mx-2 text-white regbtn">
                Dashboard
              </button>
            </div>
          </div>
          <div className="col-7">
            <div className="card bg-card2 text-white ">
              <div className="card-body">
                <div className="p-4 nunito rounded shadow">
                  <div className="row">
                    <div className="col-4 form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productName"
                        placeholder="e.g. Avanza"
                        onChange={(e) => handleInput("name", e.target.value)}
                      />
                    </div>
                    <div className="col-4 form-group">
                      <label>Brand</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productName"
                        placeholder="e.g. Toyota"
                        onChange={(e) => handleInput("brand", e.target.value)}
                      />
                    </div>
                    <div className="col-4 form-group">
                      <label>Type</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productName"
                        placeholder="e.g. Automatic"
                        onChange={(e) => handleInput("type", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 form-group">
                      <label>Year</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productName"
                        placeholder="e.g. 2019"
                        onChange={(e) => handleInput("year", e.target.value)}
                      />
                    </div>
                    <div className="col-6 form-group">
                      <label>Category</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productName"
                        placeholder="e.g. Car"
                        onChange={(e) =>
                          handleInput("category", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Image Url</label>
                    <input
                      className="form-control"
                      name="image-unit"
                      formEncType="multipart/form-data"
                      type="file"
                      onChange={(e) => handleInput("imageUrl", e.target.files)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      placeholder="e.g. Jakarta"
                      onChange={(e) => handleInput("location", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      placeholder="e.g. 450000"
                      onChange={(e) => handleInput("price", e.target.value)}
                    />
                  </div>
                </div>
                <div class="d-flex mt-3 justify-content-end mr-3">
                  <div className="btn mx-1 btn-primary" onClick={handleSubmit}>Submit</div>
                  <div className="btn mx-1 btn-danger">Cancel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
