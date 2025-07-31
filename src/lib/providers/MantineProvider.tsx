// src/lib/providers/MantineProvider.tsx
"use client";

import { MantineProvider as CoreMantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export default function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <CoreMantineProvider>
      <Notifications />
      {children}
    </CoreMantineProvider>
  );
}