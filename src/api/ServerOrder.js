import axios from "axios"

export const createUserOrder = async (authtoken, stripeResponse) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/user/order-create`, {
    stripeResponse,
  }, {
    headers: {
      authtoken: authtoken,
    },
  });
};

export const getUserOrders = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/user/orders`, {
    headers: {
      authtoken: authtoken,
    },
  });
};

export const getAllOrders = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/admin/orders`, {
    headers: {
      authtoken: authtoken,
    },
  });
}

export const updateOrderStatus = async (authtoken, orderID, orderStatus) => {
  return await axios.put(`${process.env.REACT_APP_API_URL}/admin/order-status`, {
    orderID,
    orderStatus,
  }, {
    headers: {
      authtoken: authtoken,
    },
  });
};