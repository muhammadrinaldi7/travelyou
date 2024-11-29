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
  // Bannar
  banner: "/banners",

  promo: "/promos",
  category: `${BASE_URL}/categories`,
  activity: "/activities",
  activityDetail: "/activity/",
  // Cart
  cart: "/carts",
  cartUpdate: "/update-cart/",
  addCart: "/add-cart",
  deleteCart: "/delete-cart/",

  // Transaction
  MyTransaction: "/my-transactions",
  createTransaction: "/create-transaction",
  updateTransactionProof: "/update-transaction-proof-payment/",

  // Payment
  paymentMethod: "/payment-methods",

  uploadImage: "/upload-image",
};

export default endpoints;
