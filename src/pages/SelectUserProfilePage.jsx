import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../axios";
import toast from "../sweetalert2/toast";

export default function SelectUserProfilePage() {
  const history = useHistory();
  const [profile, setProfile] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    imageKTP: "",
    imageSIM: "",
  });
  const [profiles, setProfiles] = useState([]);

  useEffect(async () => {
    if (!localStorage.access_token) {
      history.push("/");
    }
    const { data } = await axios.get("/profiles", {
      headers: { access_token: localStorage.access_token },
    });
    setProfiles(data);
    console.log(data);
  }, []);

  const handleInput = (target, value) => {
    switch (target) {
      case "fullName":
        setProfile({ ...profile, fullName: value });
        break;
      case "phoneNumber":
        setProfile({ ...profile, phoneNumber: value });
        break;
      case "email":
        setProfile({ ...profile, email: value });
        break;
      case "imageKTP":
        setProfile({ ...profile, imageKTP: value });
        break;
      case "imageSIM":
        setProfile({ ...profile, imageSIM: value });
        break;
      default:
        setProfile(profile);
    }
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    try {
      // * check empty form
      const errors = [];
      for (const form in profile) {
        if (!profile[form])
          errors.push(`${form[0].toUpperCase() + form.substring(1)}`);
      }

      if (errors.length > 0) {
        Swal.fire({
          title: "Oopss...",
          text: `Forms ${errors.join(", ")} cannot be empty!`,
          icon: "error",
        });
      } else {
        // * convert into FormData
        const fd = new FormData();
        for (const key in profile) {
          if (key === "imageKTP" || key === "imageSIM")
            fd.append(key, profile[key][0]);
          fd.append(key, profile[key]);
        }

        const data = await axios({
          method: "POST",
          url: "/profiles",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: fd,
        });
        const profiles = await axios.get("/profiles", {
          headers: { access_token: localStorage.access_token },
        });
        setProfiles(profiles.data);
        toast.fire({
          text: "Profile successfully added!",
          icon: "success",
          showConfirmButton: false,
        });
        setProfile({
          fullName: "",
          phoneNumber: "",
          email: "",
          imageKTP: "",
          imageSIM: "",
        });
        console.log(data); // * Result
      }
    } catch ({
      response: {
        data: { message: errorMessage },
      },
    }) {
      // * Error from API Request to server
      Swal.fire({
        title: "Oops...",
        icon: "error",
        text: errorMessage,
      });
    }
  };

  return (
    <>
      <div className="body">
        <div className="pt-5 row" style={{ minHeight: "88.7vh" }}>
          <div className="col-1"></div>
          <div className="col-3">
            <div className="card shadow">
              <div className="card-title russo-one pt-3 text-center">
                <h4>Select Profile</h4>
                <hr />
                {profiles.map((profile) => (
                  <div
                    key={profile._id}
                    className="input-group mb-2 nunito px-2"
                  >
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <input
                          type="radio"
                          value={profile.fullName}
                          name="profile"
                          aria-label="Radio button for following text input"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Text input with radio button"
                      disabled
                      value={profile.fullName + "'s Profile"}
                    />
                  </div>
                ))}
              </div>
              <button className="btn bg-gold mb-2 nunito mx-2 regbtn">
                Continue
              </button>
            </div>
          </div>
          <div className="col-7">
            <form>
              <div className="card nunito">
                <div className="card-body py-2">
                  <div className="rounded">
                    <h3 className="text-center">
                      <strong>Add a Profile</strong>
                    </h3>
                    <div className="input-group mb-2 mt-4">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-address-card"></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="inlineFormInputGroup"
                        placeholder="Full Name"
                        required
                        value={profile.fullName}
                        onChange={(e) =>
                          handleInput("fullName", e.target.value)
                        }
                      />
                    </div>
                    <div className="input-group mb-2 mt-4">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-phone"></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="inlineFormInputGroup"
                        placeholder="Phone Number"
                        required
                        value={profile.phoneNumber}
                        onChange={(e) =>
                          handleInput("phoneNumber", e.target.value)
                        }
                      />
                    </div>
                    <div className="input-group mb-4 mt-4">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-user-alt"></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="inlineFormInputGroup"
                        placeholder="Email"
                        required
                        value={profile.email}
                        onChange={(e) => handleInput("email", e.target.value)}
                      />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label>
                          <strong>KTP:</strong>
                        </label>
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i className="fa fa-file-image"></i>
                            </div>
                          </div>
                          <input
                            name="image"
                            formEncType="multipart/form-data"
                            type="file"
                            className="form-control"
                            id="inlineFormInputGroup"
                            placeholder="Image KTP"
                            required
                            accept="image/*"
                            onChange={(e) =>
                              handleInput("imageKTP", e.target.files)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <label>
                          <strong>SIM:</strong>
                        </label>
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i className="fa fa-file-image"></i>
                            </div>
                          </div>
                          <input
                            name="image"
                            formEncType="multipart/form-data"
                            type="file"
                            className="form-control"
                            id="inlineFormInputGroup"
                            placeholder="Image SIM"
                            required
                            accept="image/*"
                            onChange={(e) =>
                              handleInput("imageSIM", e.target.files)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-3 mb-2">
                      <button
                        className="btn bg-gold px-4"
                        onClick={(e) => handleSubmitButton(e)}
                        onSubmit={(e) => handleSubmitButton(e)}
                      >
                        Add Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
