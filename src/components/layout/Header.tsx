"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { TextInput, Burger, Group } from "@mantine/core";
import UserMenu from "./UserMenu";
import Image from "next/image";
import logoBig from "../../../public/fortech-hitam-logo.png";
import logoSmall from "../../../public/icon-fortech.jpg";

interface HeaderProps {
  mobileOpened: boolean;
  toggleMobile: () => void;
  minimized: boolean;
  setMinimized: (minimized: boolean) => void;
}

export default function Header({
  mobileOpened,
  toggleMobile,
  minimized,
}: HeaderProps) {
  return (
    <div className="flex h-full items-center justify-between gap-28 px-4">
      <Group>
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="sm"
          size="sm"
        />
        <Image
          src={minimized ? logoSmall : logoBig}
          alt="Logo"
          width={minimized ? 40 : 120}
          height={minimized ? 40 : 50}
          style={{
            transition: "all 0.2s ease",
            objectFit: "contain",
          }}
        />
      </Group>

      {/* Group untuk Search dan User Menu */}
      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="hidden sm:block w-full max-w-xs md:max-w-full">
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
    </div>
  );
}
