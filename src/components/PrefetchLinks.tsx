"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PrefetchLinks() {
  // Now we can use pathname if needed
  const pathname = usePathname();

  const commonRoutes = [
    "/",
    "/login",
    "/register",
    "/users",
    "/dashboard",
    "/profile",
  ];

  // Only prefetch routes we're not currently on
  const routesToPrefetch = commonRoutes.filter(
    (route) => route !== pathname,
  );

  return (
    <div style={{ display: "none" }} aria-hidden="true">
      {routesToPrefetch.map((route) => (
        <Link key={route} href={route} prefetch>
          {route}
        </Link>
      ))}
    </div>
  );
}
