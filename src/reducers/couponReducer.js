export function couponReducer(state = false, action) {
  switch (action.type) {
    case "COUPON_USED":
      return action.payload;
    default:
      return state;
  }
}
