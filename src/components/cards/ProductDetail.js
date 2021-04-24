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

const { TabPane } = Tabs;

const ProductDetail = ({ product, onStarClick, star }) => {
  const { images, title, description } = product;

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
      let uniqueObj = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("user_product_cart", JSON.stringify(uniqueObj));
      setToolTip("Added in Cart");
      dispatch({
        type: "ADD_TO_CART",
        payload: uniqueObj,
      });
    }
  };

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
          actions={[
            <>
              <Tooltip title={tooltip}>
                <a onClick={handleAddToCart}>
                  <ShoppingCartOutlined className="text-success" />
                  <br />
                  Add To Cart
                </a>
              </Tooltip>
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" />
              <br />
              Add To WishList
            </Link>,
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
          ]}
        >
          <ShowProductDetails product={product} />
        </Card>
      </div>
    </>
  );
};

export default ProductDetail;
