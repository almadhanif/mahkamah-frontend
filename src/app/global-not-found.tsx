import type { Metadata } from "next";
import { MantineProvider, createTheme } from "@mantine/core";
import "./globals.css";
import "@mantine/core/styles.css";
import Error404 from "@/components/ui/Errors/404";

export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you are looking for does not exist.",
};

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
});

export default function NotFound() {
  return (
    <html>
      <head />
      <body suppressHydrationWarning={true}>
        <MantineProvider theme={theme}>
          <Error404 />
        </MantineProvider>
      </body>
    </html>
  );
}
