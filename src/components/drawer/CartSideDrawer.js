import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DefaultProduct from "../img/DefaultProduct.jpg";

const CartSideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageCardStyle = {
    width: "100%",
    height: "100px",
    objectFit: "cover",
  };

  const getTotalAmountFromCart = () => {
    return cart.reduce((a, b) => {
      return a + b.count * b.price;
    }, 0);
  };

  return (
    <Drawer
      className="text-center"
      title={`Cart Items - ${cart.length} Product's`}
      onClose={() => {
        dispatch({
          type: "SHOW_DRAWER",
          payload: false,
        });
      }}
      visible={drawer}
    >
      <p className="text-center mt-1">
        Cart Total : Rs.{getTotalAmountFromCart()}
      </p>
      <Link to={"/user/cart"}>
        <button
          onClick={() => {
            dispatch({
              type: "SHOW_DRAWER",
              payload: false,
            });
          }}
          className="btn btn-primary btn-raised btn-block mb-5"
        >
          Go To Cart
        </button>
      </Link>
      {cart.map((prod) => (
        <div className="row" key={prod._id}>
          <div className="col">
            {prod.images.length && prod.images[0] ? (
              <>
                <img style={imageCardStyle} src={prod.images[0].url}></img>
                <p className="text-light text-center bg-secondary">
                  {prod.title} x {prod.count}
                </p>
              </>
            ) : (
              <>
                <img style={imageCardStyle} src={DefaultProduct}></img>
                <p className="text-light text-center bg-secondary">
                  {prod.title} x {prod.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
    </Drawer>
  );
};

export default CartSideDrawer;
