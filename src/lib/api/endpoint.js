export const BASE_PROXY = {
  service: "api/v1",
};

export const DOCUMENT_SERVICE = {
  GET: {
    getAllUsers: "/user/all",
    getAllFolders: "/folder/all",
    getAllFilesByFolderId: (id) => `/folder/${id}`,
  },
  POST: {
    loginUser: "/auth/login",
    registerUser: "auth/register",
    logoutUser: "/auth/logout",
    createFolder: "/folder/add",
    createFileBulk: (folderParentId) =>
      `folder/${folderParentId}/add-file/bulk`,
  },
  PUT: {
    updateFolder: (id) => `/folder/${id}`,
  },
  DELETE: {
    deleteFolder: (id) => `/folder/${id}`,
  },
};
