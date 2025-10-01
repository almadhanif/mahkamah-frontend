export interface Cookie {
  name: string;
  phone_number?: string; // Optional karena tidak semua user punya
  role: string;
  token: string;
  uid: string;
  userId: string; // Cookie values selalu string, convert ke number saat dipakai
}

// ✅ Tambahkan interface untuk parsed cookies
export interface ParsedCookie {
  name: string;
  phone_number?: string;
  role: string;
  token: string;
  uid: string;
  userId: number;
}

export interface User {
  user_id: number;
  name: string;
  email: string;
  role_code: string;
}

export type Folder = {
  id: number;
  name: string;
  parent_id: number | null;
  children?: Folder[];
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
};

export type File = {
  file_id: number;
  name: string;
  file_path: string;
  file_size: number;
  folder_id: number;
  file_type: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
};

export interface FileResponse {
  success: boolean;
  folder: Folder;
  content: {
    subfolders: Folder[];
    files: File[];
  };
  message: string;
  code: number;
}
