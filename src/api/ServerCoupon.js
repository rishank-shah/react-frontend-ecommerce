import axios from "axios";

export const createCoupon = async (authtoken, coupon) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/coupon/create`,
    coupon,
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};

export const removeCoupon = async (authtoken, couponId) =>
  await axios.delete(
    `${process.env.REACT_APP_API_URL}/coupon/delete/${couponId}`,
    {
      headers: {
        authtoken,
      },
    }
  );

export const getCouponList = async () =>
  await axios.get(`${process.env.REACT_APP_API_URL}/coupon/list`);

export const applyCouponUser = async (authtoken, coupon) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/coupon/apply-to-cart`,
    { coupon },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};
