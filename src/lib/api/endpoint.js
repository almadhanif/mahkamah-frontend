export const BASE_PROXY = {
  service: "api/v1",
};

export const DOCUMENT_SERVICE = {
  GET: {
    getAllUsers: "/user/all",
    getAllFolders: "/folder/all",
  },
  POST: {
    loginUser: "/auth/login",
    registerUser: "auth/register",
    logoutUser: "/auth/logout",
    createFolder: "/folder/add",
  },
  PUT: {
    updateFolder: (id) => `/folder/${id}`,
  },
  DELETE: {
    deleteFolder: (id) => `/folder/${id}`,
  },
};
