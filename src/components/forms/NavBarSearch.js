import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const NavBarSearch = () => {
  const history = useHistory();

  let dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/all-products/shop?${text}`);
  };

  return (
    <div className="row">
      <form className="form-inline form-inline-sm my-5 my-lg-2" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="form-control mr-sm-2"
          type="text"
          value={text}
          placeholder="Search"
        />
      </form>
      <SearchOutlined onClick={handleSubmit} className="mt-3 mr-3" style={{ cursor: "pointer" }} />
    </div>
  );
};

export default NavBarSearch;
