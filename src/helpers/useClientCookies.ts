"use client";

import { useEffect, useState } from "react";
import { ParsedCookie } from "@/types/types";
import {
  getServerCookies,
  getUserDataFromServer,
} from "@/lib/api/helpers/setCookie";

export function useClientCookies() {
  const [cookies, setCookies] = useState<Record<string, string>>({});
  const [user, setUser] = useState<ParsedCookie | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch cookies and user data from the server
  useEffect(() => {
    const fetchCookiesFromServer = async () => {
      try {
        setLoading(true);
        // Get cookies from server action
        const serverCookies = await getServerCookies();
        setCookies(serverCookies);

        // Get user data from server
        const userData = await getUserDataFromServer();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching cookies from server:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCookiesFromServer();
  }, []);

  // Original cookie parsing logic as fallback
  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      document.cookie &&
      Object.keys(cookies).length === 0
    ) {
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

      // Only update if we found something and don't already have server cookies
      if (Object.keys(parsedCookies).length > 0) {
        setCookies(parsedCookies);
      }
    }
  }, [cookies]);

  const getCookie = (name: string) => cookies[name];

  const getUserFromCookies = (): ParsedCookie | null => {
    // Return the pre-parsed user data from the server
    return user;
  };

  const isAuthenticated = () => {
    // Check if we have a token or user data
    return (
      !!user || !!cookies.token || !!cookies.smartkmsystemAuthClient
    );
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

  const clearAuthCookies = () => {
    const authCookieNames = [
      "token",
      "userId",
      "role",
      "uid",
      "name",
      "phone_number",
      "smartkmsystemAuthClient",
      "user",
      "SA",
      "isHijacked",
      "userId",
    ];

    authCookieNames.forEach((name) =>
      removeCookie(name, { path: "/" }),
    );

    // Reset user state
    setUser(null);
  };

  return {
    cookies,
    user,
    loading,
    getCookie,
    setCookie,
    removeCookie,
    getUserFromCookies,
    isAuthenticated,
    clearAuthCookies,
  };
}
