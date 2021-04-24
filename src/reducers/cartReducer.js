let initialState = [];

if (typeof window !== "undefined") {
  if (localStorage.getItem("user_product_cart")) {
    initialState = JSON.parse(localStorage.getItem("user_product_cart"));
  } else {
    initialState = [];
  }
}

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    default:
      return state;
  }
}
