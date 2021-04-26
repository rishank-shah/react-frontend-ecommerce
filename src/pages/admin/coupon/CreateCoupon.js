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
import { DeleteOutlined } from "@ant-design/icons";
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
    createCoupon(user.token, {
      name,
      expiry,
      discount,
    })
      .then((res) => {
        setName("");
        setExpiry('')
        setDiscount(0)
        toast.success(`Coupon (${res.data.name}) created`);
      })
      .catch((err) => {
        if (err.response.status === 400) toast.error(err.response.data);
      });
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
        <br/>
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
            <h4>Create Coupon</h4>
            {couponForm()}
          </div>
          <div className="ml-5">
            {/* <SearchForm searchText={searchText} setSearchText={setSearchText} /> */}
          </div>
          <div className="ml-5">
            <hr />
            {coupons.map((cat) => (
              <div key={cat._id} className="alert alert-primary">
                {cat.name} - {cat.expiry} - {cat.discount}
                <span className="btn btn-sm float-right">
                  <DeleteOutlined className="text-danger" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
