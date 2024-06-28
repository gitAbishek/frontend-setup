const PRODUCTION_ENV = "production";
const STAGING_ENV = "staging";

// Use import.meta.env for Vite
// const API_URL = import.meta.env.VITE_API_BASE_URL;

export const BASE_URL = (() => {
  switch (import.meta.env.VITE_ENVIRONMENT) {
    case PRODUCTION_ENV:
      return "https://api.pokharauae.com";
    case STAGING_ENV:
      return "https://api.pokharauae.com";
    default:
      return "http://127.0.0.1:8000";
  }
})();

export const AUTH_COOKIE_CONFIG = {
  BEARER_TOKEN: "bearer-token",
  loggedInCookie: "isLoggedIn",
  ACCESS_TOKEN: "pokhara-motors-user-access-token",
  REFRESH_TOKEN: "pokhara-motors-user-refresh-token",
};
