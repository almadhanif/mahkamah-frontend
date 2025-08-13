"use client";

import { Button, Center, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import Error404Svg from "@/styles/assets/404";
import logo from "@/styles/assets/krakatau_logo.svg";

export default function Error404() {
  return (
    <div className="flex flex-col min-h-screen">
      <Image
        src={logo}
        alt="Krakatau Steel Logo"
        width={150}
        height={100}
        className="m-6"
      />
      <Center style={{ flex: 1 }}>
        <Stack align="center" gap="xl" w="100%" maw={500} p="md">
          {/* SVG Illustration */}
          <div className="w-full max-w-md mx-auto">
            <Error404Svg />
          </div>

          {/* Text content */}
          <Stack align="center" gap="xs">
            <Title order={2} size="h3">
              The page you&apos;re looking for is missing
            </Title>
            <Text c="dimmed" ta="center">
              Sorry we could not find your page.
            </Text>
          </Stack>

          {/* Button */}
          <Button
            component={Link}
            href="/"
            size="md"
            fullWidth
            style={{ maxWidth: 200 }}
          >
            Return to Home
          </Button>
        </Stack>
      </Center>

      {/* Footer */}
      <Center py="md">
        <Text size="sm" c="dimmed">
          © 2025 Krakatau Steel
        </Text>
      </Center>
    </div>
  );
}
