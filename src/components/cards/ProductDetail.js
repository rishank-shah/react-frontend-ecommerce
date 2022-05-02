import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DefaultProduct from "../../components/img/DefaultProduct.jpg";
import ShowProductDetails from "./ShowProductDetails";
import StarRatings from "react-star-ratings";
import RatingModal from "../modals/RatingModal";
import { showAverageRatingFunction } from "../../functions/rating";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { saveUserWishlist } from "../../api/ServerUser";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

const ProductDetail = ({ product, onStarClick, star }) => {
  const { images, title, description } = product;

  const [tooltip, setToolTip] = useState("Click to add product in cart");

  let history = useHistory();

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

  const addToWishList = (e) => {
    e.preventDefault()
    saveUserWishlist(user.token, product._id)
      .then((res) => {
        if (res.data.success) {
          toast.success("Saved to wishlist")
          history.push('/user/wishlist')
        } else {
          toast.error("Something went wrong when adding to wishlist")
        }
      })
  }

  const actions = () => {
    if (product.quantity < 1) {
      return [
        <>
          <Tooltip title={"Item is sold out"}>
            <ShoppingCartOutlined className="text-success" />
            <br />
            Cannot add to cart
          </Tooltip>
        </>,
        <a onClick={addToWishList}>
          <HeartOutlined className="text-info" />
          <br />
          Add To WishList
        </a>,
        <RatingModal>
          <StarRatings
            name={product._id}
            numberOfStars={5}
            rating={star}
            changeRating={onStarClick}
            isSelectable={true}
            starRatedColor="red"
          />
        </RatingModal>,
      ]
    } else {
      return [
        <>
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-success" />
              <br />
              Add To Cart
            </a>
          </Tooltip>
        </>,
        <a onClick={addToWishList}>
          <HeartOutlined className="text-info" />
          <br />
          Add To WishList
        </a>,
        <RatingModal>
          <StarRatings
            name={product._id}
            numberOfStars={5}
            rating={star}
            changeRating={onStarClick}
            isSelectable={true}
            starRatedColor="red"
          />
        </RatingModal>,
      ]
    }
  }

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <img alt="not available" src={i.url} key={i.public_id}></img>
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                className="p-2"
                style={{ height: "500px", objectFit: "cover" }}
                alt="not available"
                src={DefaultProduct}
              />
            }
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="description">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="more">
            <ul>
              <li>
                See the source code on{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/rishank-shah/react-frontend-ecommerce"
                >
                  GitHub
                </a>
              </li>
              <li>More Info</li>
              <li>More Info</li>
            </ul>
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h2 className="text-center pt-2">{title}</h2>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverageRatingFunction(product)
        ) : (
          <div className="text-center pb-3">
            <h6>No Rating Yet</h6>
          </div>
        )}
        <Card
          actions={actions()}
        >
          <ShowProductDetails product={product} />
        </Card>
      </div>
    </>
  );
};

export default ProductDetail;
