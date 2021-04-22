import React from "react";
import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, DownSquareOutlined } from "@ant-design/icons";

const { SubMenu, ItemGroup } = Menu;

const ProductFilterMenu = ({
  price,
  handleSlider,
  categories,
  handleCategoryChange,
  optionCategoryID,
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

  return (
    <>
      <hr />
      <h4 className="text-center">Filter Menu</h4>
      <hr />
      <Menu defaultOpenKeys={["price-silder"]} mode="inline">
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
      </Menu>
    </>
  );
};

export default ProductFilterMenu;
