import React, { useState } from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import DefaultProduct from "../../components/img/DefaultProduct.jpg";
import { Link } from "react-router-dom";
import { showAverageRatingFunction } from "../../functions/rating";
import _ from "lodash";
import { Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setToolTip] = useState("Click to add product in cart");

  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("user_product_cart")) {
        cart = JSON.parse(localStorage.getItem("user_product_cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });

      //remove duplicate
      let uniqueObj = _.uniqWith(cart, _.isEqual);

      localStorage.setItem("user_product_cart", JSON.stringify(uniqueObj));

      setToolTip("Added in Cart");

      dispatch({
        type: "ADD_TO_CART",
        payload: uniqueObj,
      });

      dispatch({
        type: "SHOW_DRAWER",
        payload: true,
      });
    }
  };

  const actions = () => {
    if (product.quantity < 1) {
      return [
        <Tooltip title={'Item is sold out. Click to view.'}>
          <Link to={`/view/product/${product.slug}`}>
            <EyeOutlined className="text-primary" />
          </Link>
        </Tooltip>
      ]
    } else {
      return [
        <Link to={`/view/product/${product.slug}`}>
          <EyeOutlined className="text-primary" />
        </Link>,
        <Tooltip title={tooltip}>
          <a onClick={handleAddToCart}>
            <ShoppingCartOutlined className="text-secondary" />
          </a>
        </Tooltip>
      ]
    }
  }

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverageRatingFunction(product)
      ) : (
        <div className="text-center pb-3">
          <h6>No Rating Yet</h6>
        </div>
      )}
      <Card
        hoverable
        className="mb-4"
        cover={
          <img
            className="p-2"
            style={{ height: "250px", objectFit: "cover" }}
            alt="not available"
            src={
              product.images && product.images.length
                ? product.images[0].url
                : DefaultProduct
            }
          />
        }
        actions={actions()}
      >
        <Meta
          title={`${product.title} - Rs ${product.price} `}
          description={
            product.description.length > 47
              ? `${product.description.substring(0, 47)}...`
              : product.description
          }
        />
      </Card>
    </>
  );
};

export default ProductCard;
