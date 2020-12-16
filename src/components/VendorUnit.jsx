import React from "react";

export default function VendorUnit({ unit, switchPage, alertDeleteUnitById }) {
  return (
    <div className="card-body px-2 py-2 mx-3">
      <div className="row border rounded shadow">
        <div className="col-4 p-0">
          <img
            className="img-fluid rounded"
            src={unit.imageUrl}
            alt={"Gambar" + unit.name}
          />
        </div>
        <div className="col-8 nunito d-flex justify-content-between">
          <div className="">
            <strong style={{ fontSize: "25px" }}>{unit.name}</strong>
            <br />
            <div className="ml-auto d-flex align-items-start flex-column">
              <i className="mb-1 fa fa-key" style={{ fontSize: "15px" }}>
                {unit.vendor.email}
              </i>
              <small className="p-1 bg-secondary text-white text-center rounded">
                {unit.type + " " + unit.year}
              </small>
            </div>
          </div>
          <div className="d-flex align-items-start flex-column mt-3 mr-2">
            <div className="mb-auto">
              <strong>Rp. {unit.price}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <i
                onClick={() => switchPage("editPage", unit._id)}
                className="click fa fa-edit mx-1 mb-2 bg-gold py-1 px-2 text-white rounded"
              >
                {" "}
                Edit
              </i>
              <i
                onClick={() => alertDeleteUnitById(unit._id)}
                className="click fa fa-trash mx-1 mb-2 bg-danger py-1 px-2 text-white rounded"
              >
                {" "}
                Delete
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
