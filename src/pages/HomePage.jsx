import React from "react";
import "../styles/home.css";

export default function HomePage() {
  return (
    <>
      <img
        src="./car.png"
        alt=""
        className="car-image float-right mr-4"
        style={{ maxWidth: "37%", right: "1%", position: "absolute" }}
      />
      <div className="container mt-5 h-75">
        <div className="row align-items-center">
          <div
            className="w-75 bg-card shadow-lg p-3 rounded position-absolute"
            style={{ marginTop: "56%", marginLeft: "5%" }}
          >
            <div>
              <strong>Rent a vehicle</strong>
            </div>
            <div className="row mx-3 py-2">
              <div className="col-4 row">
                <div className="col-2">
                  <img src="./loc.svg" alt="" className="pt-2" />
                </div>
                <div className="col-10 row">
                  <small className="text-secondary">Search Location</small>
                  <input
                    className="bg-transparent border-0"
                    type="text"
                    placeholder="Bali"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
