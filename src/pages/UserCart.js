import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCartCard from "../components/cards/ProductCartCard";
import { userCartAPI } from "../api/ServerUser";
import { toast } from "react-toastify";

const UserCart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));

  const getTotalAmountFromCart = () => {
    return cart.reduce((a, b) => {
      return a + b.count * b.price;
    }, 0);
  };

  const checkoutCart = () => {
    userCartAPI(cart, user.token)
      .then((res) => {
        if (res.data.success) {
          history.push("/user/checkout");
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => console.log("cart err", err));
  };

  const showCartProducts = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col" style={{ width: "50px" }}>
            Shipping
          </th>
          <th scope="col" style={{ width: "50px" }} className="text-center">
            Count
          </th>
          <th scope="col" style={{ width: "50px" }}>
            Remove
          </th>
        </tr>
      </thead>
      {cart.map((product) => (
        <ProductCartCard key={product._id} product={product} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid">
      <h3 className="col text-center mt-3">
        Cart - {cart.length} products present
      </h3>
      <div className="row mt-5">
        <div className="col-md-8">
          <h4 className="ml-2 text-center">Cart Items</h4>
          <hr />
          {!cart.length ? (
            <p className="pt-4 pl-5 ml-5 h6">
              No Products present in Cart.{" "}
              <Link to={"/"}>Continue Shopping.</Link>
            </p>
          ) : (
            showCartProducts()
          )}
        </div>
        <div className="col-md-4">
          <h4 className="text-center">Order Summary</h4>
          <hr />
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cart_item, i) => (
                <tr key={i}>
                  <td>{cart_item.title}</td>
                  <td>{cart_item.count}</td>
                  <td>Rs.{cart_item.count * cart_item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <p className="text-center h5">
            Cart Total:{" "}
            <b className="text-success">Rs.{getTotalAmountFromCart()}</b>
          </p>
          <hr />
          <div className="text-center">
            {user && user.token ? (
              <button
                className="btn btn-sm btn-primary mt-2"
                onClick={checkoutCart}
                disabled={!cart.length}
              >
                Proceed to checkout
              </button>
            ) : (
              <button className="btn btn-sm btn-danger mt-2">
                <Link
                  to={{
                    pathname: "/login",
                    state: { from: "/user/cart" },
                  }}
                >
                  Login to checkout
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
