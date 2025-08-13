"use client";

import { useEffect, useState } from "react";
import { ParsedCookie } from "@/types/types";

export function useClientCookies() {
  const [cookies, setCookies] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof document !== "undefined" && document.cookie) {
      const parsedCookies = document.cookie
        .split("; ")
        .filter((cookie) => cookie.includes("="))
        .reduce(
          (acc, cookie) => {
            const [name, ...rest] = cookie.split("=");
            const value = rest.join("=");
            if (name && value) {
              acc[name.trim()] = decodeURIComponent(value.trim());
            }
            return acc;
          },
          {} as Record<string, string>,
        );

      setCookies(parsedCookies);
    }
  }, []);

  const getCookie = (name: string) => cookies[name];

  // ✅ Helper untuk mendapatkan user info dari cookies
  const getUserFromCookies = (): ParsedCookie | null => {
    const { name, phone_number, role, token, uid, userId } = cookies;

    if (!token || !userId) {
      return null;
    }

    return {
      name: name || "",
      phone_number,
      role: role || "",
      token,
      uid: uid || "",
      userId: parseInt(userId, 10) || 0,
    };
  };

  // ✅ Check if user is authenticated
  const isAuthenticated = () => {
    return !!cookies.token && !!cookies.userId;
  };

  const setCookie = (
    name: string,
    value: string,
    options?: {
      expires?: Date;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: "strict" | "lax" | "none";
    },
  ) => {
    if (typeof document === "undefined") return;

    let cookieString = `${name}=${encodeURIComponent(value)}`;

    if (options?.expires) {
      cookieString += `; expires=${options.expires.toUTCString()}`;
    }
    if (options?.path) {
      cookieString += `; path=${options.path}`;
    }
    if (options?.domain) {
      cookieString += `; domain=${options.domain}`;
    }
    if (options?.secure) {
      cookieString += `; secure`;
    }
    if (options?.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieString;
    setCookies((prev) => ({ ...prev, [name]: value }));
  };

  const removeCookie = (
    name: string,
    options?: { path?: string; domain?: string },
  ) => {
    setCookie(name, "", {
      ...options,
      expires: new Date(0),
    });

    setCookies((prev) => {
      const newCookies = { ...prev };
      delete newCookies[name];
      return newCookies;
    });
  };

  // ✅ Clear all auth cookies
  const clearAuthCookies = () => {
    const authCookieNames = [
      "token",
      "userId",
      "role",
      "uid",
      "name",
      "phone_number",
    ];
    authCookieNames.forEach((name) =>
      removeCookie(name, { path: "/" }),
    );
  };

  return {
    cookies,
    getCookie,
    setCookie,
    removeCookie,
    getUserFromCookies,
    isAuthenticated,
    clearAuthCookies,
  };
}
