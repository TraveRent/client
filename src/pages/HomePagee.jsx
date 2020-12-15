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
      <div className="container mt-5 h-75 text-white">
        <div className="row align-items-center">
          <div
            className="w-75 bg-card shadow-lg p-3 rounded position-absolute"
            style={{ marginTop: "56%", marginLeft: "5%" }}
          >
            <div className="pl-3">
              <strong>Rent a vehicle</strong>
            </div>
            <div className="row my-4 mx-3">
              <div className="col-4 row border py-3 rounded">
                <div className="col-2 mr-2">
                  <img src="./loc.svg" alt="" className="pt-2 fillwhite mr-3" />
                </div>
                <div className="col-10 row my-auto pt-1 text-white">
                  <small className="">Search Location</small>
                  <input
                    className="bg-transparent border-0"
                    type="text"
                    placeholder="Bali"
                  />
                </div>
              </div>
              <div className="col-3 p-auto ml-3 border-top border-bottom border-right rounded">
                <div className="">
                  <small className="ml-2 p-0">Start date</small>
                  <br />
                  <input
                    className=" m-0 mt-2 p-0 bg-transparent border-0"
                    type="date"
                  />
                </div>
              </div>
              <div className="col-3 p-auto border-top border-bottom border-right rounded">
                <div className="">
                  <small className="ml-2 p-0">End date</small>
                  <br />
                  <input
                    className="border-0 m-0 mt-2 p-0 bg-transparent"
                    type="date"
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
