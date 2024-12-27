require("dotenv").config();

const BASE_URLS = {
  CLIENT:
    process.env.NODE_ENV === "production"
      ? process.env.CLIENT_BASE_URL
      : "http://localhost:5173",
  SERVER:
    process.env.NODE_ENV === "production"
      ? process.env.SERVER_BASE_URL
      : "http://localhost:3000",
};

exports.constants = {
  MAIL_FROM: "Fitness Networking fitness@gmail.com",
  CLIENT_BASE_URL: BASE_URLS.CLIENT,
  SERVER_BASE_URL: BASE_URLS.SERVER,
  CLIENT_ERROR_URL: `${BASE_URLS.CLIENT}/error`,
  CLIENT_URL: `${BASE_URLS.CLIENT}/`,
  AUTH_URL: `${BASE_URLS.SERVER}/api/auth/`,
  USER_URL: `${BASE_URLS.SERVER}/api/user/`,
  PARTNER_URL: `${BASE_URLS.SERVER}/api/partner/`,
  ADMIN_URL: `${BASE_URLS.SERVER}/api/admin/`,
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  COOKIE_MAX_AGE_MS: 24 * 60 * 60 * 1000,
};
