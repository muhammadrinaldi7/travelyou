const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const endpoints = {
  // Auth
  logout: "/logout",
  login: "/login",
  register: "/register",
  // User
  user: "/user",
  users: "/all-user",
  updateUser: "/update-profile",
  updateRole: `/update-user-role/`,
  banner: "/banner",
  promo: "/promos",
  category: `${BASE_URL}/categories`,
  activity: "/activities",
  activityDetail: "/activity/",
  // Cart
  cart: "/carts",
  cartUpdate: "/update-cart/",
  addCart: "/add-cart",
  deleteCart: "/delete-cart/",

  // Payment
  paymentMethod: "/payment-method",
  transaction: "/transaction",
};

export default endpoints;
