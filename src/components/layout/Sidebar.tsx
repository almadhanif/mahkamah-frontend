"use client";

import { NavLink, Stack, Box } from "@mantine/core";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import logo from "@/styles/assets/krakatau_logo.svg";
import Image from "next/image";

const navLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "material-symbols:dashboard-outline",
  },
  {
    name: "Users",
    href: "/users",
    icon: "mdi:users-outline",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "uil:setting",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      h="100%"
      py="md"
      pl="xs"
      // px="xs"
      bg="gray.0"
      style={{ borderRight: "1px solid var(--mantine-color-gray-3)" }}
    >
      <Image
        src={logo}
        alt="Krakatau Steel Logo"
        width="150"
        height="100"
        className="mb-6 mt-2 mr-4 ml-2"
      />

      <Stack gap="xs">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <NavLink
              key={link.name}
              component={Link}
              href={link.href}
              label={link.name}
              leftSection={
                <Icon
                  icon={link.icon}
                  width="24"
                  height="24"
                  color={isActive ? "white" : "gray"}
                />
              }
              active={isActive}
              variant={isActive ? "filled" : "light"}
              style={{
                fontWeight: isActive ? 600 : 400,
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
