"use server";

import { cookies } from "next/headers";
import { ParsedCookie } from "@/types/types";

export async function getServerCookies(): Promise<
  Record<string, string>
> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  return allCookies.reduce(
    (acc, cookie) => {
      acc[cookie.name] = cookie.value;
      return acc;
    },
    {} as Record<string, string>,
  );
}

export async function getUserDataFromServer(): Promise<ParsedCookie | null> {
  const cookieStore = await cookies();

  // Get individual cookies
  const token = cookieStore.get("token")?.value;
  const name = cookieStore.get("name")?.value;
  const role =
    cookieStore.get("role")?.value || cookieStore.get("SA")?.value;
  const uid = cookieStore.get("uid")?.value;
  const phone = cookieStore.get("phone_number")?.value;
  const userId =
    cookieStore.get("userId")?.value ||
    cookieStore.get("userid")?.value ||
    cookieStore.get("userId")?.value;

  if (token || name || role || uid) {
    return {
      name: name || "",
      phone_number: phone || "",
      role: role || "",
      token: token || "",
      uid: uid || "",
      userId: userId ? parseInt(userId, 10) : 0,
    };
  }

  return null;
}
