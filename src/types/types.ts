export interface Cookie {
  name: string;
  phone_number?: string; // ✅ Optional karena tidak semua user punya
  role: string;
  token: string;
  uid: string;
  userId: string; // ✅ Cookie values selalu string, convert ke number saat dipakai
}

// ✅ Tambahkan interface untuk parsed cookies
export interface ParsedCookie {
  name: string;
  phone_number?: string;
  role: string;
  token: string;
  uid: string;
  userId: number; // ✅ Sudah dikonversi ke number
}

export interface User {
  user_id: number;
  name: string;
  email: string;
  role: string;
}
