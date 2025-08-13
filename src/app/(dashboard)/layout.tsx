"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { AppShell } from "@mantine/core";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      navbar={{
        width: 220,
        breakpoint: "sm",
      }}
    >
      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Header />
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
