export const BASE_PROXY = {
  service: "api/v1",
};

export const KRAKATAU_SERVICE = {
  GET: {
    getAllUsers: "/user/all",
  },
  POST: {
    loginUser: "/auth/login",
    registerUser: "auth/register",
    logoutUser: "/auth/logout",
  },
};
