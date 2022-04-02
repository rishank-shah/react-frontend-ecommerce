import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  createCoupon,
  removeCoupon,
  getCouponList,
} from "../../../api/ServerCoupon";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setLoading(true);
    getCouponList().then((res) => {
      setLoading(false);
      setCoupons(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 6) {
      toast.error("Name should be of 6 or more characters");
    } else if (name.length > 12) {
      toast.error("Name can be maximum 12 characters");
    }else if (discount < 0 || discount > 100) {
      toast.error("Discount should be between 0% to 100%");
    } else {
      setLoading(true);
      createCoupon(user.token, {
        name,
        expiry,
        discount,
      })
        .then((res) => {
          setName("");
          setLoading(false);
          setExpiry("");
          setDiscount(0);
          toast.success(`Coupon (${res.data.name}) created`);
          getCouponList().then((res) => {
            setCoupons(res.data);
          });
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  const handleDeleteCoupon = (coupon_id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      setLoading(true);
      removeCoupon(user.token, coupon_id)
        .then((res) => {
          setLoading(false);
          toast.success(`Deleted Coupon`);
          getCouponList().then((res2) => {
            setCoupons(res2.data);
          });
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  const couponForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        ></input>
      </div>
      <div className="form-group">
        <label>Discount%</label>
        <input
          type="number"
          className="form-control"
          onChange={(e) => setDiscount(e.target.value)}
          value={discount}
          required
        ></input>
      </div>
      <div className="form-group">
        <label>Expiry</label>
        <br />
        <DatePicker
          selected={expiry || new Date()}
          className="form-control"
          onChange={(e) => setExpiry(e)}
          value={expiry}
          required
        />
      </div>
      <button className="mt-2 btn btn-outline-primary">Save Coupon</button>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-9">
          <div className="ml-5 mt-3">
            <h4>
              Create Coupon {"   "}{" "}
              {loading ? (
                <LoadingOutlined className="ml-3 text-danger h4" />
              ) : (
                ""
              )}
            </h4>
            {couponForm()}
          </div>
          <div className="ml-5">
            {/* <SearchForm searchText={searchText} setSearchText={setSearchText} /> */}
          </div>
          <div className="ml-5">
            <hr />
            <h5 className="text-center">Total Coupons - {coupons.length}</h5>
            <hr />

            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th className="text-center" scope="col">
                    Name
                  </th>
                  <th className="text-center" scope="col">
                    Expiry
                  </th>
                  <th className="text-center" scope="col">
                    Discount
                  </th>
                  <th className="text-center" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon._id}>
                    <td className="text-center">{coupon.name}</td>
                    <td className="text-center">
                      {new Date(coupon.expiry).toLocaleDateString()}
                    </td>
                    <td className="text-center">{coupon.discount}</td>
                    <td className="text-center">
                      <DeleteOutlined
                        className="text-danger pointer"
                        onClick={() => handleDeleteCoupon(coupon._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
