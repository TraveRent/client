import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/home.css";
import Autosuggest from "react-autosuggest";
import fetchUnit from "../hooks/fetchUnit";
import { useHistory } from "react-router-dom";
import Toast from "../sweetalert2/toast";

export default function HomePage() {
  const router = useHistory();
  const dispatch = useDispatch();
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [value, setValue] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const units = useSelector((state) => state.units);

  useEffect(() => {
    dispatch(fetchUnit());
  }, []);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : units.filter(
          (unit) =>
            unit.location.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValues = (suggestion) => suggestion.location;

  const onSuggestionsFetchRequesteds = ({ value }) => {
    setSuggestion(getSuggestions(value));
  };
  const onSuggestionsClearRequesteds = () => {
    setSuggestion([]);
  };
  const onChanges = (event, { newValue }) => {
    setValue(newValue);
  };
  const inputProps = {
    placeholder: "e.g Bali",
    value,
    onChange: onChanges,
  };
  const search = (event) => {
    event.preventDefault();
    if (!endDate || !startDate || !value) {
      Toast.fire({
        title: "Please fill up all the fields!",
        icon: "error",
        showConfirmButton: false,
      });
    } else {
      console.log("masuk");
      router.push({
        pathname: "/result",
        state: {
          location: value,
          units: units.filter(
            (unit) => unit.location.toLowerCase() === value.toLowerCase()
          ),
        },
      });
    }
  };
  const renderSuggestion = (suggestion) => (
    <span className="m-auto p-auto">{suggestion.location}</span>
  );
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
      <form>
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
                <Autosuggest
                  required
                  className="rounded"
                  suggestions={suggestion}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequesteds}
                  onSuggestionsClearRequested={onSuggestionsClearRequesteds}
                  getSuggestionValue={getSuggestionValues}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                ></Autosuggest>
              </div>
            </div>
            <div className="col-3 text-center mt-2 text-white">
              <small className="ml-2 ">Start date</small>
              <br />
              <input
                className=" m-0 mt-2 p-0 bg-transparent border-0"
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="col-3 text-center mt-2 text-white">
              <small className="ml-2 ">End date</small>
              <br />
              <input
                className=" m-0 mt-2 p-0 bg-transparent border-0"
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="col-3 m-auto text-center">
              <button
                type="submit"
                className="btn bg-gold px-5"
                onSubmit={(event) => search(event)}
                onClick={(event) => search(event)}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
