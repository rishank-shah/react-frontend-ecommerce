import axios from "axios";

export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API_URL}/category/list`);

export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API_URL}/category/${slug}`);

export const removeCategory = async (authtoken, slug) =>
  await axios.delete(`${process.env.REACT_APP_API_URL}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateCategory = async (authtoken, category, slug) =>
  await axios.put(
    `${process.env.REACT_APP_API_URL}/category/${slug}`,
    {
      name: category,
    },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );

export const createCategory = async (authtoken, category) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/category`,
    {
      name: category,
    },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );

export const getSubcatgeoryByCategory = async (id) =>
  await axios.get(
    `${process.env.REACT_APP_API_URL}/category/subcategories/${id}`
  );

export const getCategoryAndProducts = async (slug,page) =>
  await axios.post(`${process.env.REACT_APP_API_URL}/category/products/${slug}`,{page});
