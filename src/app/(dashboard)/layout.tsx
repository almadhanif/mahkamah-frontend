"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { AppShell, ActionIcon, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [minimized, setMinimized] = useState(false);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }} // <-- Kembalikan tinggi header
      navbar={{
        width: minimized ? 80 : 250,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened },
      }}
      padding={0}
    >
      <AppShell.Header>
        {/* Header sekarang berisi komponen Header Anda secara penuh */}
        <Header
          mobileOpened={mobileOpened}
          toggleMobile={toggleMobile}
          minimized={minimized}
          setMinimized={setMinimized}
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <Sidebar minimized={minimized} setMinimized={setMinimized} />

        {/* 👇 TOMBOL MINIMIZE UNTUK DESKTOP DI SINI 👇 */}
        {/* Tombol ini akan disembunyikan di bawah breakpoint 'sm' (mobile) */}
        <div className="hidden sm:block">
          <Tooltip
            label={minimized ? "Perluas sidebar" : "Kecilkan sidebar"}
            position="right"
          >
            <ActionIcon
              variant="default"
              size="md"
              radius="xl"
              onClick={() => setMinimized((prev) => !prev)}
              style={{
                position: "absolute",
                top: "50%",
                right: -14, // Posisi di tengah garis batas
                transform: "translateY(-50%)",
                zIndex: 1000,
                border: "1px solid var(--mantine-color-gray-3)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Icon
                icon={
                  minimized
                    ? "material-symbols:chevron-right"
                    : "material-symbols:chevron-left"
                }
                width={18}
                height={18}
              />
            </ActionIcon>
          </Tooltip>
        </div>
      </AppShell.Navbar>

      <AppShell.Main>
        <div>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
