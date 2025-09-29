"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { AppShell } from "@mantine/core";
import { useState } from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [minimized, setMinimized] = useState(false);
  return (
    <AppShell
      navbar={{
        width: minimized ? 72 : 220,
        breakpoint: "sm",
      }}
    >
      <AppShell.Navbar>
        <Sidebar minimized={minimized} setMinimized={setMinimized} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Header />
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
