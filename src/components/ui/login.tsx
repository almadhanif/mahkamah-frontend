"use client";

import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Networks from "@/lib/api/network-factory";
import { KRAKATAU_SERVICE } from "@/lib/api/endpoint";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function AuthenticationForm(props: PaperProps) {
  const router = useRouter();
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [type, toggle] = useToggle(["login", "register"]);

  // Buat service instance
  const authService = Networks("service");

  // Setup mutation
  const { mutateAsync: loginMutation, isPending } =
    authService.useMutation("post");

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) =>
        /^\S+@\S+$/.test(val) ? null : "Invalid email",
      // password: (val) =>
      //   val.length <= 6
      //     ? "Password should include at least 6 characters"
      //     : null,
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
    if (type === "login") {
      await loginMutation({
        endpoint: KRAKATAU_SERVICE.POST.loginUser,
        data: {
          email: values.email,
          password: values.password,
        },
      });

      notifications.show({
        title: "Login successful",
        message: "You have been logged in successfully",
        color: "green",
      });
      setLoginSuccess(true);
    } else {
      notifications.show({
        title: "Register",
        message: "Registration functionality not implemented yet",
        color: "blue",
      });
    }
  };

  if (loginSuccess) {
    return (
      <div className="flex items-center justify-center">
        <p>Login successful. Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <Paper radius="md" p="lg" withBorder {...props}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue(
                "password",
                event.currentTarget.value,
              )
            }
            error={form.errors.password}
            radius="md"
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue(
                  "terms",
                  event.currentTarget.checked,
                )
              }
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" loading={isPending}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
