// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/notifications/styles.css";
import MantineProvider from "@/lib/providers/MantineProvider";
import QueryProvider from "@/lib/providers/QueryProvider";
import PrefetchLinks from "@/components/PrefetchLinks";
import NiceModalProvider from "@/lib/providers/NiceModalProvider";
import ModalPortal from "@/components/ui/Modals/ModalPortal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krakatau Steel",
  description: "Krakatau Steel Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <QueryProvider>
          <MantineProvider>
            <NiceModalProvider>
              <PrefetchLinks />
              <ModalPortal />
              {children}
            </NiceModalProvider>
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
