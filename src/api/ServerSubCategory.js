import axios from "axios";

export const getSubCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API_URL}/subcategory/list`);

export const getSubCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API_URL}/subcategory/${slug}`);

export const removeSubCategory = async (authtoken, slug) =>
  await axios.delete(`${process.env.REACT_APP_API_URL}/subcategory/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateSubCategory = async (authtoken, subcategory, parent, slug) =>
  await axios.put(
    `${process.env.REACT_APP_API_URL}/subcategory/${slug}`,
    {
      name: subcategory,
      parent,
    },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );

export const createSubCategory = async (authtoken, subcategory, parent) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/subcategory`,
    {
      name: subcategory,
      parent,
    },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );

export const getSubCategoryAndProducts = async (slug, page) =>
  await axios.post(
    `${process.env.REACT_APP_API_URL}/subcategory/products/${slug}`,
    { page }
  );
