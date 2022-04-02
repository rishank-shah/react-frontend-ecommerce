import React, { useEffect, useState } from "react";
import {
  getUserCart,
  deleteUserCart,
  saveUserAddress,
  getUserAddress,
} from "../api/ServerUser";
import { applyCouponUser } from '../api/ServerCoupon'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CartCheckout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("")

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      if (res.data.success) {
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
        setTotalAfterDiscount(res.data.totalAfterDiscount);
      }
    });
    getUserAddress(user.token).then((res) => {
      setAddress(res.data.address);
      if (res.data.address !== undefined && res.data.address !== '') {
        setAddressSaved(true)
      }
    });
  }, []);

  const saveAddress = () => {
    saveUserAddress(address, user.token).then((res) => {
      if (res.data.success) {
        if (address !== undefined && address !== '') {
          setAddressSaved(true);
          toast.success("Address Saved");
        }
      }
    });
  };

  const applyCoupon = () => {
    applyCouponUser(user.token, coupon)
      .then(res => {
        if (res.data.err) {
          toast.error(res.data.err)
          dispatch({
            type: "COUPON_USED",
            payload: false,
          })
        } else if (res.data.totalAfterDiscount) {
          setTotalAfterDiscount(res.data.totalAfterDiscount)
          toast.success(`Coupon applied succesfully. Total after discount is ${res.data.totalAfterDiscount}`)
          dispatch({
            type: "COUPON_USED",
            payload: true,
          })
        }
      })
  }

  const handleDeleteCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_product_cart");
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    deleteUserCart(user.token).then((res) => {
      if (res.data.success) {
        setProducts([]);
        setCartTotal(0);
        setTotalAfterDiscount(0);
        setCoupon("")
        toast.success("Cart Deleted");
      }
    });
  };

  return (
    <div className="row">
      <div className="col-md-6 mt-5">
        <h4 className="text-center">Delivery Address</h4>
        <br />
        <ReactQuill
          className="p-3"
          theme="snow"
          value={address}
          onChange={setAddress}
        />
        <div className="text-center">
          <button className="btn btn-success " onClick={saveAddress}>
            Save
          </button>
        </div>
        <hr />
        <hr />
        <h4 className="text-center mt-4">Discount Coupons</h4>
        <br />
        <input value={coupon} onChange={e => setCoupon(e.target.value)} type="text" className="form-control"></input>

        <div className="text-center">
          <button onClick={applyCoupon} disabled={coupon.length <= 0} className="btn btn-success  mt-3">Apply Coupon</button>
        </div>
      </div>

      <div className="col-md-6 mt-5">
        <h4 className="text-center">Order Summary</h4>
        <hr />
        <h6 className="text-center">Number Of Products : {products.length}</h6>
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Color</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, i) => (
              <tr key={i}>
                <td>{prod.product.title}</td>
                <td>{prod.color}</td>
                <td>{prod.count}</td>
                <td>Rs.{prod.count * prod.price} </td>
              </tr>
            ))}
            <tr>
              <td className="text-center h3" colSpan="3">
                CartTotal
              </td>
              <td>
                <span className="text-success h4">
                  <b>Rs {cartTotal}</b>
                </span>
              </td>
            </tr>
            {totalAfterDiscount > 0 && (
              <tr>
                <td className="text-center h3 bg-success" colSpan="3">
                  CartTotal After Discount
                </td>
                <td>
                  <span className="text-success h4">
                    <b>Rs {totalAfterDiscount}</b>
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <hr />
        <div className="row">
          <div className="col-md-5">
            <button
              className="btn btn-primary"
              disabled={!addressSaved || !products.length}
              onClick={() => history.push("/payment")}
            >
              Place Order
            </button>
          </div>
          <div className="col-md-5">
            <button
              className="btn btn-primary"
              onClick={handleDeleteCart}
              disabled={!products.length}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;
