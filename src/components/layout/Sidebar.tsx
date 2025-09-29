"use client";

import {
  NavLink,
  Stack,
  Box,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import logoBig from "../../../public/logo-fortech.webp";
import logoSmall from "../../../public/icon-fortech.jpg";
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

interface SidebarProps {
  minimized: boolean;
  setMinimized: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  minimized,
  setMinimized,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <Box
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
      }}
    >
      {/* Sidebar Content */}
      <Box
        h="100%"
        py="md"
        pl="xs"
        pr="xs"
        bg="gray.0"
        style={{
          borderRight: "1px solid var(--mantine-color-gray-3)",
          width: "100%",
          transition: "all 0.2s ease",
        }}
      >
        {/* Logo Section */}
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: minimized ? "center" : "flex-start",
            height: 60,
          }}
        >
          <Image
            src={minimized ? logoSmall : logoBig}
            alt="PT Fortech Logo"
            width={minimized ? 40 : 120}
            height={minimized ? 40 : 50}
            style={{
              transition: "all 0.2s ease",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Navigation Links */}
        <Stack gap="xs" align={minimized ? "center" : "stretch"}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return minimized ? (
              <Tooltip
                label={link.name}
                position="right"
                key={link.name}
              >
                <ActionIcon
                  component={Link}
                  href={link.href}
                  size={48}
                  variant={isActive ? "filled" : "light"}
                  color={isActive ? "blue" : "gray"}
                  style={{
                    marginBottom: 8,
                    borderRadius: 12,
                  }}
                >
                  <Icon icon={link.icon} width="24" height="24" />
                </ActionIcon>
              </Tooltip>
            ) : (
              <NavLink
                key={link.name}
                component={Link}
                href={link.href}
                label={link.name}
                leftSection={
                  <Icon icon={link.icon} width="20" height="20" />
                }
                active={isActive}
                style={{
                  borderRadius: 8,
                  fontWeight: isActive ? 600 : 400,
                }}
              />
            );
          })}
        </Stack>
      </Box>

      {/* Toggle Button - Positioned on the border */}
      <Tooltip
        label={minimized ? "Expand sidebar" : "Collapse sidebar"}
        position="right"
      >
        <ActionIcon
          variant="filled"
          color="blue"
          size="md"
          radius="xl"
          onClick={() => setMinimized((prev) => !prev)}
          aria-label={
            minimized ? "Expand sidebar" : "Collapse sidebar"
          }
          style={{
            position: "absolute",
            top: "50%",
            right: -12,
            transform: "translateY(-50%)",
            zIndex: 1000,
            background: "white",
            border: "2px solid var(--mantine-color-gray-3)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            transition: "all 0.2s ease",
          }}
        >
          <Icon
            icon={
              minimized
                ? "material-symbols:chevron-right"
                : "material-symbols:chevron-left"
            }
            width={16}
            height={16}
            style={{
              color: "var(--mantine-color-gray-7)",
            }}
          />
        </ActionIcon>
      </Tooltip>
    </Box>
  );
}
