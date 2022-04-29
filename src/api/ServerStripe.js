import axios from "axios"

export const createPaymentIntent = async (authtoken, coupon) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/create/payment-intent`, {
    coupon,
  }, {
    headers: {
      authtoken: authtoken,
    },
  });
};