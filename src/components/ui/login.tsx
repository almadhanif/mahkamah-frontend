"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Networks from "@/lib/api/network-factory";
import { KRAKATAU_SERVICE } from "@/lib/api/endpoint";
import { Icon } from "@iconify/react/dist/iconify.js";

export function AuthenticationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Buat service instance
  const authService = Networks("service");
  const { mutateAsync: loginMutation } =
    authService.useMutation("post");

  useEffect(() => {
    if (loginSuccess) {
      router.prefetch("/dashboard");
      const timer = setTimeout(() => {
        router.replace("/dashboard");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await loginMutation({
        endpoint: KRAKATAU_SERVICE.POST.loginUser,
        data: {
          email: formData.email,
          password: formData.password,
        },
      });

      notifications.show({
        title: "Login berhasil",
        message: "Anda berhasil masuk ke sistem",
        color: "green",
      });
      setLoginSuccess(true);
    } catch {
      setError("Email atau password salah");
      notifications.show({
        title: "Login gagal",
        message: "Email atau password salah",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loginSuccess) {
    return (
      <div className="flex items-center justify-center p-4 space-x-2">
        <span className="text-sm">
          Login berhasil. Mengarahkan ke dashboard...
        </span>
        <Loader size="sm" type="bars" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            className="w-full px-3 py-2.5 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              className="w-full px-3 py-2.5 pr-10 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <Icon icon="mdi:eye" width="16" height="16" />
              ) : (
                <Icon icon="mdi:eye-off" width="16" height="16" />
              )}
            </button>
          </div>
        </div>

        {/* Button */}
        <Button
          type="submit"
          className="w-full py-2.5 text-base font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader size="sm" className="mr-2" /> Memproses...
            </>
          ) : (
            "Masuk ke Dashboard"
          )}
        </Button>
      </form>
    </div>
  );
}
