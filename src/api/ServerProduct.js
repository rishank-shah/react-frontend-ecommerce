import axios from "axios";

export const createProduct = async (authtoken, product) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/product`, product, {
    headers: {
      authtoken: authtoken,
    },
  });
};

export const updateProduct = async (authtoken, slug, product) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/product/${slug}`,
    product,
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};

export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API_URL}/products/${count}`);

export const removeProduct = async (authtoken, slug) =>
  await axios.delete(`${process.env.REACT_APP_API_URL}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const readProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API_URL}/product/${slug}`);

export const getProducts = async (sort, order, page,limit) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/products`, {
    sort,
    order,
    page,
    limit:limit || 4
  });
};

export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API_URL}/product/total/count`);

export const starProduct = async (productId, star,authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getRelatedProduct = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API_URL}/product/related-products/${productId}`);