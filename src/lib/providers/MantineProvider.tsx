"use client";

import {
  MantineProvider as BaseMantineProvider,
  createTheme,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  primaryColor: "blue",
});

export default function MantineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseMantineProvider theme={theme}>
      <Notifications position="top-right" />
      {children}
    </BaseMantineProvider>
  );
}
