// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import MantineProvider from "@/lib/providers/MantineProvider";
import QueryProvider from "@/lib/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krakatau Steel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <MantineProvider>{children}</MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
