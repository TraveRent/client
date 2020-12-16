import React from "react";
import { useState, useEffect } from "react";
import { useHistory, use } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import "../styles/home.css";

export default function HomePage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const filterUnit = useSelector((state) => state.units)
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [location, setLocation] = useState("")

  const handleSubmit = () => {
    history.push('/result')
  }

  return (
    <div className="">
      <div className="row body px-3 pt-5 pb-5">
        <div className="col-7 body row">
          <div className="col-8 ml-4 pb-0 russo-one text-white upsize">
            Let Us Take You Around
          </div>
          <div className="russo-one ml-5 p-auto text-white mt-minus">
            Brrm Brrm Brrrm, Choose the vehicle and Hit the road!
          </div>
        </div>
        <div className="col-5 row m-0 p-0 rounded shadow car">
          <div className="col-4 m-0 p-0" style={{ height: "auto" }}>
            <div className="p-3 nunito carcar">
              We have many choices for your needs.
            </div>
          </div>
          <div className="col-8 m-0 p-0">
            <img className="img-fluid" src="./car.png" alt="" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6 bg-card-searchbox shadow rounded ml-5 row m-minus">
          <div className="col-3 py-4 px-0 row">
            <svg
              className="col-5 p-0"
              width="28"
              height="34"
              viewBox="0 0 28 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9998 17C12.1665 17 10.6665 15.5 10.6665 13.6667C10.6665 11.8334 12.1665 10.3334 13.9998 10.3334C15.8332 10.3334 17.3332 11.8334 17.3332 13.6667C17.3332 15.5 15.8332 17 13.9998 17ZM23.9998 14C23.9998 7.95002 19.5832 3.66668 13.9998 3.66668C8.4165 3.66668 3.99984 7.95002 3.99984 14C3.99984 17.9 7.24984 23.0667 13.9998 29.2334C20.7498 23.0667 23.9998 17.9 23.9998 14ZM13.9998 0.333351C20.9998 0.333351 27.3332 5.70002 27.3332 14C27.3332 19.5334 22.8832 26.0834 13.9998 33.6667C5.1165 26.0834 0.666504 19.5334 0.666504 14C0.666504 5.70002 6.99984 0.333351 13.9998 0.333351Z"
                fill="white"
              />
            </svg>
            <div className="col-7 px-0 row my-auto text-white">
              <small className="">Search Location</small>
              <input
                className="bg-transparent inputs text-white border-0"
                type="text"
                placeholder="Bali"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="col-3 text-center mt-2 text-white">
            <small className="ml-2 ">Start date</small>
            <br />
            <input
              className=" m-0 mt-2 p-0 bg-transparent border-0"
              type="date"
            />
          </div>
          <div className="col-3 text-center mt-2 text-white">
            <small className="ml-2 ">End date</small>
            <br />
            <input
              className=" m-0 mt-2 p-0 bg-transparent border-0"
              type="date"
            />
          </div>
          <div className="col-3 m-auto text-center">
            <button
              className="btn bg-gold px-5"
              onClick={handleSubmit}
              // onClick={() => setResult(["a", "b"])}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
