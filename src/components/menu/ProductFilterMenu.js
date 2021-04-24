import React from "react";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import StarRattingMenu from "./StarRattingMenu";

const { SubMenu } = Menu;

const ProductFilterMenu = ({
  price,
  handleSlider,
  categories,
  handleCategoryChange,
  optionCategoryID,
  handleStarClicked,
  clearAllFilters,
  showClearButton,
  subCategories,
  handleSubCategoryChange,
  handleBrandChange,
  brandClicked,
  handleColorChange,
  colorClicked,
  handleShippingChange,
  shippingClicked,
}) => {
  const brandOptions = [
    "HP",
    "Asus",
    "Dell",
    "Apple",
    "Lenovo",
    "Samsung",
    "Microsoft",
  ];

  const colorOptions = ["Black", "White", "Brown", "Blue", "Silver", "Gold"];

  const shippingOptions = ["Yes", "No"];

  const showCategoriesList = () =>
    categories.map((cat) => (
      <div key={cat._id}>
        <Checkbox
          onChange={handleCategoryChange}
          className="pb-2 pl-4 pr-4"
          value={cat._id}
          name="category"
          checked={optionCategoryID.includes(cat._id)}
        >
          {cat.name}
        </Checkbox>
        <br />
      </div>
    ));

  const showRatingStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <StarRattingMenu clickedStar={handleStarClicked} numberOfStars={1} />
      <StarRattingMenu clickedStar={handleStarClicked} numberOfStars={2} />
      <StarRattingMenu clickedStar={handleStarClicked} numberOfStars={3} />
      <StarRattingMenu clickedStar={handleStarClicked} numberOfStars={4} />
      <StarRattingMenu clickedStar={handleStarClicked} numberOfStars={5} />
    </div>
  );

  const showSubCategoriesList = () =>
    subCategories.map((sub) => (
      <div
        key={sub._id}
        onClick={() => handleSubCategoryChange(sub)}
        className="p-1 m-1 badge badge-primary"
        style={{ cursor: "pointer" }}
      >
        {sub.name}
      </div>
    ));

  const showBrand = () =>
    brandOptions.map((brand, i) => (
      <div key={i}>
        <Radio
          onChange={handleBrandChange}
          className="pb-2 pl-4 pr-4"
          value={brand}
          name="category"
          checked={brand === brandClicked}
        >
          {brand}
        </Radio>
        <br />
      </div>
    ));

  const showColor = () =>
    colorOptions.map((color, i) => (
      <div key={i}>
        <Radio
          onChange={handleColorChange}
          className="pb-2 pl-4 pr-4"
          value={color}
          name="category"
          checked={color === colorClicked}
        >
          {color}
        </Radio>
        <br />
      </div>
    ));

  const showShipping = () =>
    shippingOptions.map((shipping, i) => (
      <div key={i}>
        <Radio
          onChange={handleShippingChange}
          className="pb-2 pl-4 pr-4"
          value={shipping}
          name="category"
          checked={shipping === shippingClicked}
        >
          {shipping}
        </Radio>
        <br />
      </div>
    ));

  return (
    <>
      <hr />
      <h4 className="text-center">Filter Menu</h4>
      {showClearButton && (
        <>
          <hr />
          <div className="text-center mt-3">
            <button onClick={clearAllFilters} className="btn btn-danger">
              <CloseOutlined />
              Clear Filter
            </button>
          </div>
        </>
      )}
      <Menu defaultOpenKeys={["price-silder", "brand-filter"]} mode="inline">
        <hr />
        <SubMenu
          key="price-silder"
          title={
            <span className="h6">
              <DollarOutlined />
              Price Range
            </span>
          }
        >
          <div>
            <Slider
              className="ml-4 mr-4"
              tipFormatter={(v) => `${v} INR`}
              range
              value={price}
              onChange={handleSlider}
              max="150000"
            />
          </div>
        </SubMenu>

        <hr />

        <SubMenu
          key="brand-filter"
          title={
            <span className="h6">
              <StarOutlined />
              Brands
            </span>
          }
        >
          <div className="mt-1">{showBrand()}</div>
        </SubMenu>

        <hr />

        <SubMenu
          key="ratting-filter"
          title={
            <span className="h6">
              <StarOutlined />
              Ratting
            </span>
          }
        >
          <div className="mt-1">{showRatingStars()}</div>
        </SubMenu>

        <hr />

        <SubMenu
          key="category-filter"
          title={
            <span className="h6">
              <DownSquareOutlined />
              Category
            </span>
          }
        >
          <div className="mt-1">{showCategoriesList()}</div>
        </SubMenu>

        <hr />

        <SubMenu
          key="sub-category-filter"
          title={
            <span className="h6">
              <DownSquareOutlined />
              SubCategory
            </span>
          }
        >
          <div className="mt-1 ml-4">{showSubCategoriesList()}</div>
        </SubMenu>

        <hr />

        <SubMenu
          key="color-filter"
          title={
            <span className="h6">
              <DownSquareOutlined />
              Color
            </span>
          }
        >
          <div className="mt-1">{showColor()}</div>
        </SubMenu>

        <hr />

        <SubMenu
          key="shipping-filter"
          title={
            <span className="h6">
              <DownSquareOutlined />
              Shipping Option
            </span>
          }
        >
          <div className="mt-1">{showShipping()}</div>
        </SubMenu>

        <hr />
      </Menu>
    </>
  );
};

export default ProductFilterMenu;
