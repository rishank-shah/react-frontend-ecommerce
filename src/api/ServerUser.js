import axios from "axios";

export const userCartAPI = async (cart, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/user/cart/checkout`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserCart = async (authtoken) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/user/cart/checkout`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const deleteUserCart = async (authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/user/cart/checkout`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const saveUserAddress = async (address, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserAddress = async (authtoken) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/user/saved/address`,
    {
      headers: {
        authtoken,
      },
    }
  );
};