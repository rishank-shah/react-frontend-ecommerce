import React, { useEffect, useState } from "react";
import {
  getProducts,
  getProductsCount,
  searchFilterProduct,
} from "../api/ServerProduct";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "antd";
import ProductCard from "../components/cards/ProductCard";
import { LoadingOutlined } from "@ant-design/icons";
import ProductFilterMenu from "../components/menu/ProductFilterMenu";
import { getCategories } from "../api/ServerCategory";
import { getSubCategories } from "../api/ServerSubCategory";

const NUMBER_OF_PRODUCTS_ON_PAGE = 9;

const AllProductsShop = () => {
  const [showClearButton, setShowClearButton] = useState(false);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const [showPagination, setShowPagination] = useState(false);

  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  const [categories, setCategories] = useState([]);
  const [optionCategoryID, setOptionCategoryID] = useState([]);

  const [star, setStar] = useState(0);

  const [subCategories, setSubCategories] = useState([]);
  const [subCatClicked, setSubCatClicked] = useState({});

  const [brandClicked, setBrandClicked] = useState("");

  const [colorClicked, setColorClicked] = useState("");

  const [shippingClicked, setShippingClicked] = useState("");

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  let dispatch = useDispatch();

  const loadDefaultProductOnLoad = (page) => {
    setLoading(true);
    getProducts("sold", "desc", page, NUMBER_OF_PRODUCTS_ON_PAGE).then(
      (res) => {
        setProducts(res.data);
        setLoading(false);
        setShowPagination(true);
        setShowClearButton(false);
      }
    );
  };

  const loadCategories = () => {
    getCategories().then((res) => setCategories(res.data));
  };

  const loadSubCategories = () => {
    getSubCategories().then((res) => setSubCategories(res.data));
  };

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  useEffect(() => {
    loadDefaultProductOnLoad(page);
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      filterProducts({ search_query: text });
    }, 300);
    return () => clearTimeout(delay);
    // eslint-disable-next-line
  }, [text]);

  const filterProducts = (args) => {
    if (text !== "" && text !== undefined) {
      searchFilterProduct(args).then((res) => {
        if (res.data.error) {
          console.log(res.data);
        } else {
          setShowPagination(false);
          setProducts(res.data);
          setShowClearButton(true);
        }
      });
    } else {
      loadDefaultProductOnLoad();
    }
  };

  useEffect(() => {
    priceRangeFilter({ price });
    // eslint-disable-next-line
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setStar(0);
    setOptionCategoryID([]);
    setPrice(value);
    setBrandClicked("");
    setSubCatClicked({});
    setColorClicked("");
    setShippingClicked("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const priceRangeFilter = (args) => {
    if (price[0] !== 0 || price[1] !== 0) {
      searchFilterProduct(args).then((res) => {
        if (res.data.error) {
          console.log(res.data);
        } else {
          setShowPagination(false);
          setProducts(res.data);
          setShowClearButton(true);
        }
      });
    } else {
      setProducts([]);
      setShowPagination(false);
    }
  };

  const handleCategoryChange = (e) => {
    setPrice([0, 0]);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setStar(0);
    setSubCatClicked({});
    setBrandClicked("");
    setColorClicked("");
    setShippingClicked("");
    let previousStateCategories = [...optionCategoryID];
    let selectedNow = e.target.value;
    let ifInState = previousStateCategories.indexOf(selectedNow);

    if (ifInState === -1) {
      previousStateCategories.push(selectedNow);
    } else {
      previousStateCategories.splice(ifInState, 1);
    }
    setOptionCategoryID(previousStateCategories);
    if (previousStateCategories.length > 0) {
      searchFilterProduct({ category: previousStateCategories }).then((res) => {
        if (res.data.error) {
          console.log(res.data);
        } else {
          setShowPagination(false);
          setProducts(res.data);
          setShowClearButton(true);
        }
      });
    } else {
      loadDefaultProductOnLoad();
    }
  };

  const handleStarClicked = (num) => {
    setPrice([0, 0]);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setOptionCategoryID([]);
    setSubCatClicked({});
    setBrandClicked("");
    setColorClicked("");
    setShippingClicked("");
    setStar(num);
    if (num > 0) {
      searchFilterProduct({ numberOfStars: num }).then((res) => {
        if (res.data.error) {
          console.log(res.data);
        } else {
          setShowPagination(false);
          setProducts(res.data);
          setShowClearButton(true);
        }
      });
    } else {
      loadDefaultProductOnLoad();
    }
  };

  const handleSubCategoryChange = (subCategoryClicked) => {
    setPrice([0, 0]);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setOptionCategoryID([]);
    setStar(0);
    setSubCatClicked(subCategoryClicked);
    setBrandClicked("");
    setShippingClicked("");
    setColorClicked("");
    searchFilterProduct({ subCategories: subCategoryClicked }).then((res) => {
      if (res.data.error) {
        console.log(res.data);
      } else {
        setShowPagination(false);
        setProducts(res.data);
        setShowClearButton(true);
      }
    });
  };

  const handleBrandChange = (e) => {
    setBrandClicked(e.target.value);
    setPrice([0, 0]);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setOptionCategoryID([]);
    setStar(0);
    setSubCatClicked({});
    setShippingClicked("");
    setColorClicked("");
    searchFilterProduct({ brand: e.target.value }).then((res) => {
      if (res.data.error) {
        console.log(res.data);
      } else {
        setShowPagination(false);
        setProducts(res.data);
        setShowClearButton(true);
      }
    });
  };

  const handleColorChange = (e) => {
    setColorClicked(e.target.value);
    setBrandClicked("");
    setPrice([0, 0]);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setOptionCategoryID([]);
    setStar(0);
    setSubCatClicked({});
    setShippingClicked("");
    searchFilterProduct({ color: e.target.value }).then((res) => {
      if (res.data.error) {
        console.log(res.data);
      } else {
        setShowPagination(false);
        setProducts(res.data);
        setShowClearButton(true);
      }
    });
  };

  const handleShippingChange = (e) => {
    setShippingClicked(e.target.value);
    setColorClicked("");
    setBrandClicked("");
    setPrice([0, 0]);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setOptionCategoryID([]);
    setStar(0);
    setSubCatClicked({});
    searchFilterProduct({ shipping: e.target.value }).then((res) => {
      if (res.data.error) {
        console.log(res.data);
      } else {
        setShowPagination(false);
        setProducts(res.data);
        setShowClearButton(true);
      }
    });
  };

  const showProducts = () => {
    return (
      <>
        <div className="row">
          {products.map((p) => (
            <div key={p._id} className="col-md-4 mt-3 mb-5">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        {showPagination && (
          <Pagination
            className="text-center mt-5"
            current={page}
            total={(productsCount / NUMBER_OF_PRODUCTS_ON_PAGE) * 10}
            onChange={(value) => setPage(value)}
          />
        )}
      </>
    );
  };

  const clearAllFilters = () => {
    setPrice([0, 0]);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setOptionCategoryID([]);
    setStar(0);
    setSubCatClicked({});
    setShowClearButton(false);
    setBrandClicked("");
    setColorClicked("");
    setShippingClicked("");
    loadDefaultProductOnLoad();
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <ProductFilterMenu
              price={price}
              handleSlider={handleSlider}
              categories={categories}
              handleCategoryChange={handleCategoryChange}
              optionCategoryID={optionCategoryID}
              handleStarClicked={handleStarClicked}
              clearAllFilters={clearAllFilters}
              showClearButton={showClearButton}
              subCategories={subCategories}
              handleSubCategoryChange={handleSubCategoryChange}
              handleBrandChange={handleBrandChange}
              brandClicked={brandClicked}
              handleColorChange={handleColorChange}
              colorClicked={colorClicked}
              handleShippingChange={handleShippingChange}
              shippingClicked={shippingClicked}
            />
          </div>
          <div className="col-md-9">
            {loading ? (
              <h3 className="text-center text-danger mt-5">
                L<LoadingOutlined />
                ading
              </h3>
            ) : (
              <h3 className="text-center mt-5 p-3 mb-5 jumbotron">
                Product's {star > 0 ? ` filtered by ${star} stars` : ""}{" "}
                {subCatClicked !== undefined && subCatClicked.name !== undefined
                  ? ` filtered by ${subCatClicked.name} SubCategory`
                  : ""}
                {brandClicked && brandClicked !== ""
                  ? ` filtered by ${brandClicked} Brand`
                  : ""}
                {colorClicked && colorClicked !== ""
                  ? ` filtered by ${colorClicked} Color`
                  : ""}
                {shippingClicked && shippingClicked !== ""
                  ? ` filtered by Shipping option: ${shippingClicked}`
                  : ""}
              </h3>
            )}
            {productsCount < 1 || products.length <= 0 ? (
              <p className="text-center text-danger">No Product Found</p>
            ) : (
              showProducts()
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProductsShop;
