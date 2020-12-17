import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import rpFormat from "../helpers/rpFormat";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../sweetalert2/toast";
import _ from "lodash";
import { setDataOrder } from "../store/actions";
import fetchOrder from "../hooks/fetchOrder";

export default function ResultPage() {
  const dispatch = useDispatch();
  const router = useHistory();
  const [location, setLocation] = useState(router.location.state.location);
  const [type, setType] = useState({ automatic: false, manual: false });
  const [category, setCategory] = useState({ car: false, motorcycle: false });
  const [filters, setFilters] = useState([]);
  const [brands, setBrands] = useState([]);
  const units = router.location.state.units;
  const [filtered, setFiltered] = useState([]);
  const { startDate, endDate } = router.location.state.date;
  const [dataOrder, setDataOrderState] = useState({});
  const orders = useSelector((state) => state.orders);

  const toProfilePage = () => {
    if (!localStorage.getItem("access_token")) {
      Toast.fire({
        title: "Please login first",
        icon: "error",
        showConfirmButton: false,
      });
    } else {
      dispatch(setDataOrder({ ...dataOrder, startDate, endDate }));
      router.push("/profile");
    }
  };

  useEffect(() => {
    dispatch(fetchOrder());
    if (!router.location.state.location) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    let result = _.cloneDeep(filtered);
    if (filters.length !== 0) {
      filters.forEach((el) => {
        if (el === "Automatic" || el === "Manual") {
          if (result.length !== 0) {
            result = result.filter((unit) => unit.type === el);
          } else {
            result = units.filter((unit) => unit.type === el);
          }
        }
        if (el === "Motorcycle" || el === "Car") {
          if (result.length !== 0) {
            result = result.filter((unit) => unit.category === el);
          } else {
            result = units.filter((unit) => unit.category === el);
          }
        }
      });
      setFiltered(result);
    } else {
      setFiltered([]);
    }
  }, [type, category]);

  const handleType = (params) => {
    if (params === "Automatic") {
      setType({ ...type, automatic: !type.automatic });
      let arrFilter = filters;
      if (type.automatic) {
        arrFilter = arrFilter.filter((el) => el !== params);
        setFilters(arrFilter);
      } else {
        arrFilter.push(params);
        setFilters(arrFilter);
      }
    } else {
      setType({ ...type, manual: !type.manual });
      let arrFilter = filters;
      if (type.manual) {
        arrFilter = arrFilter.filter((el) => el !== params);
        setFilters(arrFilter);
      } else {
        arrFilter.push(params);
        setFilters(arrFilter);
      }
    }
  };

  const handleCategory = (params) => {
    if (params === "Car") {
      setCategory({ ...category, car: !category.car });
      let arrFilter = filters;
      if (category.car) {
        arrFilter = arrFilter.filter((el) => el !== params);
        setFilters(arrFilter);
      } else {
        arrFilter.push(params);
        setFilters(arrFilter);
      }
    } else {
      setCategory({ ...category, motorcycle: !category.motorcycle });
      let arrFilter = filters;
      if (category.motorcycle) {
        arrFilter = arrFilter.filter((el) => el !== params);
        setFilters(arrFilter);
      } else {
        arrFilter.push(params);
        setFilters(arrFilter);
      }
    }
  };

  const handleBrand = (obj, params) => {
    if (brands.length === 0) {
      setBrands([{ [Object.keys(obj)]: !obj[params] }]);
    } else {
      let brand = _.cloneDeep(brands);
      for (const key in brand) {
        brand[key][params] = !brand[key][params];
        setBrands(brand);
      }
    }
  };

  return (
    <div className="body">
      <div className="pt-5 row pb-5" style={{ minHeight: "88.7vh" }}>
        <div className="col-1"></div>
        <div className="col-3">
          <div className="card shadow">
            <div className="card-title pt-3 text-center">
              <h1>
                <strong>{location}</strong>
              </h1>
            </div>
            <div className="text-center pt-2 m-0">
              <h4 className="m-0">Filter</h4>
            </div>
            <div className="card-body m-0 pt-0">
              <strong>Type</strong>
              <div className="border pl-1 mt-2 shadow">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={() => handleType("Automatic")}
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
                    onChange={() => handleType("Manual")}
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
                      onChange={() => handleCategory("Car")}
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
                      onChange={() => handleCategory("Motorcycle")}
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
            </div>
          </div>
        </div>
        <div className="col-7">
          <div className="card">
            {filtered.length > 0
              ? filtered.map((unit) => (
                  <div key={unit._id} className="card-body px-2 py-2 mx-3">
                    <div className="row border rounded shadow">
                      <div className="col-4 p-0">
                        <img
                          className="img-fluid rounded"
                          src={unit.imageUrl}
                          alt={unit.name}
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
                              {" " + unit.vendor.fullName}
                            </i>
                            <small className="p-1 bg-secondary text-white text-center rounded">
                              {unit.type + " " + unit.year}
                            </small>
                          </div>
                        </div>
                        <div className="d-flex align-items-start flex-column mt-3 mr-2">
                          <div className="mb-auto">
                            <strong>{rpFormat(unit.price)} </strong>
                          </div>
                          <button
                            data-toggle="modal"
                            data-target="#exampleModalLong"
                            className="btn bg-gold text-white mx-auto px-4 nunito mb-2"
                          >
                            Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : units.map((unit) => (
                  <div key={unit._id} className="card-body px-2 py-2 mx-3">
                    <div className="row border rounded shadow">
                      <div className="col-4 p-0">
                        <img
                          className="img-fluid rounded"
                          src={unit.imageUrl}
                          alt={unit.name}
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
                              {unit.vendor.fullName}
                            </i>
                            <small className="p-1 bg-secondary text-white text-center rounded">
                              {unit.type + " " + unit.year}
                            </small>
                          </div>
                        </div>
                        <div className="d-flex align-items-start flex-column mt-3 mr-2">
                          <div className="mb-auto">
                            <strong>{rpFormat(unit.price)} </strong>
                          </div>
                          <button
                            data-toggle="modal"
                            data-target="#exampleModalLong"
                            className="btn bg-gold text-white mx-auto px-4 nunito mb-2"
                            onClick={() =>
                              setDataOrderState({
                                unitId: unit._id,
                                vendorId: unit.vendor._id,
                                unit,
                              })
                            }
                          >
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
        tabIndex="-1"
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
              <div>
                Bagi penyewa lepas kunci wajib memiliki SIM sesuai dengan mobil
                yang disewa
                <hr />
                Memiliki KTP yang akan disimpan oleh pemiliki sewa selama masa
                penyewaan
                <hr />
                Ada nya ketentuan denda sewa jika melebihi batas waktu sewa
                <hr />
                Adanya fasilitas pengantaran mobil dan pickup mobil pada
                daerah-daerah tertentu
                <hr />
                Adanya aturan wilayah pemakaian kendaraan sesuai perjanjian
                <hr />
                Pihak sewa mobil berhak menolak pelanggan sesuai kriteria
                pelanggan
                <hr />
                Adanya aturan tentang denda asuransi mobil jika terjadi
                kerusakan ringan atau kerusakan berat
                <hr />
                Tidak diperkenankan untuk digunakan balapan tidak resmi
                <hr />
                Durasi penyewaan dianggap digunakan secara full dan tidak bisa
                dipotong untuk digunakan di lain waktu
                <hr />
                Jika dengan sopir Harga sewa tidak termasuk dengan harga Bahan
                Bakar, namun biasanya ada juga paket sewa dengan sopir dan BBM
                <hr />
                Kecelakaan yang disebabkan sopir perusahaan sewa akan ditanggung
                perusahaan sewa
                <hr />
                Pembatalan sewa biasanya akan dikenakan denda sesuai dengan
                aturan masing-masing perusahaan sewa
              </div>
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
