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
  //Activity
  activity: "/activities",
  activityDetail: "/activity/",
  createActivity: "/create-activity",
  deleteActivity: "/delete-activity/",
  // Bannar
  banner: "/banners",
  bannerById: "/banner/",
  addBanner: "/create-banner",
  deleteBanner: "/delete-banner",
  updateBanner: "/update-banner/",

  // Promo
  promo: "/promos",
  promoById: "/promo/",
  createPromo: "/create-promo",
  deletePromo: "/delete-promo",
  updatePromo: "/update-promo/",

  category: `${BASE_URL}/categories`,

  // Cart
  cart: "/carts",
  cartUpdate: "/update-cart/",
  addCart: "/add-cart",
  deleteCart: "/delete-cart",

  // Categories
  categories: "/categories",
  categoriesById: "/category/",
  createCategory: "/create-category",
  deleteCategory: "/delete-category",
  updateCategory: "/update-category/",

  // Transaction
  transaction: "/all-transactions",
  MyTransaction: "/my-transactions",
  createTransaction: "/create-transaction",
  updateTransactionProof: "/update-transaction-proof-payment/",

  // Payment
  paymentMethod: "/payment-methods",

  uploadImage: "/upload-image",
};

export default endpoints;
