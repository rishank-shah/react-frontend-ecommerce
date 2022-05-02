import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import NavBarSearch from "../forms/NavBarSearch";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let history = useHistory();
  let { user, cart } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    history.listen((location) => {
      if (location.pathname === '/all-products/shop') {
        setCurrent("shop")
      } else if (location.pathname === '/') {
        setCurrent("home")
      } else if (location.pathname === '/user/cart') {
        setCurrent("cart")
      }
    })
  }, [history])

  const handleClick = (event) => {
    setCurrent(event.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="shop" icon={<ShopOutlined />}>
        <Link to="/all-products/shop">All Products</Link>
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/user/cart">
          <Badge count={cart.length} offset={[12, -4]}>
            Cart
          </Badge>
        </Link>
      </Item>

      {!user && (
        <>
          <Item
            key="register"
            icon={<UserAddOutlined />}
            className="float-right"
          >
            <Link to="/login">Login</Link>
          </Item>

          <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/register">Register</Link>
          </Item>
        </>
      )}

      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email.split("@")[0]}
          className="float-right"
        >
          {user && user.role === "user-normal" && (
            <Item key="setting:1">
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          {user && user.role === "user-role-admin" && (
            <Item key="setting:1">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
      <span className="float-right">
        <NavBarSearch />
      </span>
    </Menu>
  );
};

export default Header;
