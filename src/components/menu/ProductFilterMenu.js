import React from "react";
import { Menu, Slider, Checkbox } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import StarRattingMenu from "./StarRattingMenu";

const { SubMenu, ItemGroup } = Menu;

const ProductFilterMenu = ({
  price,
  handleSlider,
  categories,
  handleCategoryChange,
  optionCategoryID,
  handleStarClicked,
  clearAllFilters,
  showClearButton,
}) => {
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
              Clear All Filters
            </button>
          </div>
        </>
      )}
      <Menu defaultOpenKeys={["price-silder", "ratting-filter"]} mode="inline">
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
      </Menu>
    </>
  );
};

export default ProductFilterMenu;
