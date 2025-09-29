"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AuthenticationForm } from "@/components/ui/login";

export default function HCMISLoginPage() {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Kolom Kiri: Form Login */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-md space-y-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo dan Judul */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo-fortech.webp"
                alt="Logo"
                width={96}
                height={120}
              />
            </div>
            <h1 className="text-3xl font-bold font-montserrat text-primary">
              Selamat Datang
            </h1>
            <p className="text-muted-foreground mt-2">
              Smart Document Analysis System
            </p>
          </div>

          {/* Kartu Form Login */}
          <Card className="shadow-lg border-t-4 border-t-primary">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-montserrat">
                Masuk ke Akun Anda
              </CardTitle>
              <CardDescription>
                Gunakan kredensial Anda untuk melanjutkan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuthenticationForm />
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="mt-10 text-center text-xs text-gray-500">
            © 2025 PT. Fortech Indotama
            <br />
            Seluruh hak cipta dilindungi.
          </p>
        </motion.div>
      </div>

      {/* Kolom Kanan: Gambar Latar */}
      <div className="hidden lg:block relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/login-bg.jpg')` }}
        >
          {/* Efek Overlay Gradasi */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Konten di atas gambar */}
        <motion.div
          className="relative h-full flex flex-col justify-end p-10 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <Icon
              icon="mdi:shield-check"
              width="24"
              height="24"
              className=" text-white/80 mb-4"
            />
            <h2 className="text-2xl font-semibold font-montserrat leading-tight">
              Artificial Intelligence Document System
            </h2>
            <p className="mt-2 text-white/80 max-w-lg">
              Kami memastikan data Anda terlindungi dengan enkripsi
              tingkat lanjut serta menyediakan alat yang Anda butuhkan
              untuk manajemen dokumen analisis yang terintegrasi
              dengan Artificial Intelligence.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
