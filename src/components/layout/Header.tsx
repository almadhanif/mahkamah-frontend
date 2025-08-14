// src/components/layout/Header.tsx

"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { TextInput } from "@mantine/core";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-300 bg-white sticky top-0 z-20">
      <div className="flex items-center justify-between gap-4 px-4 py-2">
        <div className="flex-grow w-full">
          <TextInput
            leftSection={
              <Icon
                icon="material-symbols:search-rounded"
                width="18"
                height="18"
              />
            }
            placeholder="Cari disini"
          />
        </div>

        <UserMenu />
      </div>
    </header>
  );
}
