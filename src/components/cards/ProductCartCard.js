import React from "react";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import DefaultProduct from "../img/DefaultProduct.jpg";
import { toast } from "react-toastify";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  CloseCircleOutlined,
} from "@ant-design/icons";

const ProductCartCard = ({ product }) => {
  const colors = ["Black", "White", "Brown", "Blue", "Silver", "Gold"];

  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("user_product_cart")) {
        cart = JSON.parse(localStorage.getItem("user_product_cart"));
      }
      cart.map((prod, i) => {
        if (prod._id === product._id) {
          cart[i].color = e.target.value;
        }
      });

      localStorage.setItem("user_product_cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleProductCountChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > product.quantity) {
      toast.error(`Maximum available quantity: ${product.quantity}`);
      return;
    }

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("user_product_cart")) {
        cart = JSON.parse(localStorage.getItem("user_product_cart"));
      }
      cart.map((prod, i) => {
        if (prod._id === product._id) {
          cart[i].count = parseInt(count);
        }
      });

      localStorage.setItem("user_product_cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemoveFromCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("user_product_cart")) {
        cart = JSON.parse(localStorage.getItem("user_product_cart"));
      }

      cart.map((prod, i) => {
        if (prod._id === product._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("user_product_cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
      toast.success(`Removed ${product.title} from cart`);
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "90px", height: "auto" }}>
            {product.images.length ? (
              <ModalImage
                small={product.images[0].url}
                large={product.images[0].url}
              />
            ) : (
              <ModalImage small={DefaultProduct} large={DefaultProduct} />
            )}
          </div>
        </td>
        <td>{product.title}</td>
        <td>Rs.{product.price}</td>
        <td>{product.brand}</td>
        <td className="form-group">
          <select
            className="form-control"
            name="color"
            onChange={handleColorChange}
          >
            {product.color ? (
              <option value={product.color}>{product.color}</option>
            ) : (
              <option>Select Color</option>
            )}
            {colors
              .filter((c) => c !== product.color)
              .map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          {product.shipping === "No" ? (
            <CloseCircleFilled className="text-danger" />
          ) : (
            <CheckCircleFilled className="text-success" />
          )}
        </td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={product.count}
            onChange={handleProductCountChange}
          ></input>
        </td>
        <td className="text-center">
          <CloseCircleOutlined
            className="text-danger pointer"
            onClick={handleRemoveFromCart}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCartCard;
