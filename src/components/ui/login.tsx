"use client";

import {
  Button,
  Checkbox,
  PaperProps,
  PasswordInput,
  Stack,
  TextInput,
  Box,
  Text,
  Flex,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
// import { useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Networks from "@/lib/api/network-factory";
import { KRAKATAU_SERVICE } from "@/lib/api/endpoint";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function AuthenticationForm(props: PaperProps) {
  const router = useRouter();
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  // const [type] = useToggle(["login", "register"]);

  // Buat service instance
  const authService = Networks("service");

  // Setup mutation
  const { mutateAsync: loginMutation, isPending } =
    authService.useMutation("post");

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },

    validate: {
      email: (val) =>
        /^\S+@\S+$/.test(val) ? null : "Email tidak valid",
    },
  });

  useEffect(() => {
    if (loginSuccess) {
      router.prefetch("/dashboard");
      const timer = setTimeout(() => {
        router.replace("/dashboard");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess, router]);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await loginMutation({
        endpoint: KRAKATAU_SERVICE.POST.loginUser,
        data: {
          email: values.email,
          password: values.password,
        },
      });

      notifications.show({
        title: "Login berhasil",
        message: "Anda berhasil masuk ke sistem",
        color: "green",
      });
      setLoginSuccess(true);
    } catch (error) {
      notifications.show({
        title: "Login gagal",
        message: "Email atau password salah",
        color: "red",
      });
    }
  };

  if (loginSuccess) {
    return (
      <Box className="flex items-center justify-center p-4">
        <Text>Login berhasil. Mengarahkan ke dashboard...</Text>
        <Loader size="sm" type="bars" />
      </Box>
    );
  }

  return (
    <Box {...props}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            required
            label="Email"
            placeholder="Masukan email"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
            size="md"
            styles={{
              label: {
                marginBottom: 8,
                fontWeight: 500,
              },
              input: {
                borderColor: "#e0e0e0",
                "&:focus": {
                  borderColor: "#228be6",
                },
              },
            }}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Masukan password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue(
                "password",
                event.currentTarget.value,
              )
            }
            error={form.errors.password}
            size="md"
            styles={{
              label: {
                marginBottom: 8,
                fontWeight: 500,
              },
              input: {
                borderColor: "#e0e0e0",
                "&:focus": {
                  borderColor: "#228be6",
                },
              },
            }}
          />

          <Flex justify="space-between" align="center" mt="xs">
            {/* <Anchor
              component="button"
              type="button"
              size="sm"
              c="blue"
              fw={500}
            >
              Forgot password?
            </Anchor> */}

            <Checkbox
              label="Remember me"
              checked={form.values.remember}
              onChange={(event) =>
                form.setFieldValue(
                  "remember",
                  event.currentTarget.checked,
                )
              }
            />
          </Flex>

          <Button
            type="submit"
            loading={isPending}
            fullWidth
            size="md"
            styles={{
              root: {
                backgroundColor: "#0369a1",
                "&:hover": {
                  backgroundColor: "#0284c7",
                },
              },
            }}
            mt="md"
          >
            Sign In
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
