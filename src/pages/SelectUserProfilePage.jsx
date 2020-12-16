import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "../axios";

export default function SelectUserProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    imageKTP: "",
    imageSIM: "",
  });

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

  const handleSubmitButton = async () => {
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
                <div class="input-group mb-2 nunito px-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input
                        type="radio"
                        value="akbar"
                        name="profile"
                        aria-label="Radio button for following text input"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Text input with radio button"
                    disabled
                    value="Akbar's profile"
                  />
                </div>
                <div class="input-group mb-2 nunito px-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <input
                        type="radio"
                        value="Farhan"
                        name="profile"
                        aria-label="Radio button for following text input"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Text input with radio button"
                    disabled
                    value="Farhan's profile"
                  />
                </div>
              </div>
              <button className="btn bg-gold mb-2 nunito mx-2 regbtn">
                Continue
              </button>
            </div>
          </div>
          <div className="col-7">
            <div className="card nunito">
              <div className="card-body py-2">
                <div className="rounded">
                  <h3 className="text-center">
                    <strong>Add a Profile</strong>
                  </h3>
                  <div class="input-group mb-2 mt-4">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i className="fa fa-address-card"></i>
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      id="inlineFormInputGroup"
                      placeholder="Full Name"
                      required
                      value={profile.fullName}
                      onChange={(e) => handleInput("fullName", e.target.value)}
                    />
                  </div>
                  <div class="input-group mb-2 mt-4">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i className="fa fa-phone"></i>
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      id="inlineFormInputGroup"
                      placeholder="Phone Number"
                      required
                      value={profile.phoneNumber}
                      onChange={(e) =>
                        handleInput("phoneNumber", e.target.value)
                      }
                    />
                  </div>
                  <div class="input-group mb-4 mt-4">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i className="fa fa-user-alt"></i>
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
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
                      <div class="input-group mb-2">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <i className="fa fa-file-image"></i>
                          </div>
                        </div>
                        <input
                          name="image"
                          formEncType="multipart/form-data"
                          type="file"
                          class="form-control"
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
                      <div class="input-group mb-2">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <i className="fa fa-file-image"></i>
                          </div>
                        </div>
                        <input
                          name="image"
                          formEncType="multipart/form-data"
                          type="file"
                          class="form-control"
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
                      onClick={() => handleSubmitButton()}
                    >
                      Add Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
