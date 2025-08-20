"use client";

import { NavLink, Stack, Box, Flex, Text } from "@mantine/core";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import logo from "@/styles/assets/logoMA.jpg";
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
      bg="white"
      style={{ borderRight: "1px solid var(--mantine-color-gray-3)" }}
    >
      <Flex align="center" className="space-x-2 mb-6">
        <Image
          src={logo}
          alt="Mahkamah Agung Logo"
          width="60"
          height="60"
        />
        <Text size="md" fw={700}>
          Mahkamah Agung
        </Text>
      </Flex>

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
