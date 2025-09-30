"use client";

import { useState } from "react";
import cx from "clsx";
import {
  Combobox,
  UnstyledButton,
  useCombobox,
  Text,
  Divider,
  Loader,
} from "@mantine/core";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

import ProfilePicture from "../ui/ProfilePicture";
import iconUser from "@/styles/assets/icon-user.jpg";
import classes from "./UserMenu.module.css";
import { menuOptions } from "@/styles/constants";
import { useClientCookies } from "@/helpers/useClientCookies";
import Networks from "@/lib/api/network-factory";
import { DOCUMENT_SERVICE } from "@/lib/api/endpoint";
import Link from "next/link";

export default function UserMenu() {
  const router = useRouter();
  const [animating, setAnimating] = useState(false);

  const { user, clearAuthCookies } = useClientCookies();

  const userService = Networks("service");
  const { mutateAsync, isPending } = userService.useMutation("post");

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setAnimating(false);
    },
    onDropdownOpen: () => setAnimating(true),
  });

  // Handler for logout
  const handleLogout = async () => {
    await mutateAsync({
      endpoint: DOCUMENT_SERVICE.POST.logoutUser,
    });
    clearAuthCookies();
    router.replace("/");
  };

  const options = menuOptions.map((item, index) => {
    const isLogout = item.value === "logout";

    return (
      <Combobox.Option
        value={item.value}
        key={item.value}
        className={cx(classes.menuItem, {
          [classes.animateOption]: animating,
        })}
        style={{ animationDelay: `${index * 30}ms` }}
      >
        {isLogout ? (
          <button
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              await handleLogout();
            }}
            className="flex items-center gap-2 py-2 px-3 w-full text-left"
          >
            <Icon icon={item.icon} width={18} />
            <span>{item.label}</span>
          </button>
        ) : (
          <Link
            href={item.value}
            className="flex items-center gap-2 py-2 px-3 w-full"
          >
            <Icon icon={item.icon} width={18} />
            <span>{item.label}</span>
          </Link>
        )}
      </Combobox.Option>
    );
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="relative">
      <Combobox
        store={combobox}
        withinPortal={true}
        onOptionSubmit={async (val) => {
          combobox.closeDropdown();

          switch (val) {
            case "logout":
              await handleLogout();
              break;
            default:
              break;
          }
        }}
        classNames={{
          dropdown: classes.dropdown,
        }}
        position="bottom-end"
        offset={8}
      >
        <Combobox.Target>
          <UnstyledButton
            onClick={() => combobox.toggleDropdown()}
            className={classes.userButton}
          >
            <ProfilePicture
              size="sm"
              alt="User Profile"
              imageUrl={iconUser.src}
            />
            <Icon
              icon="ri:arrow-down-s-line"
              width="24"
              height="24"
            />
          </UnstyledButton>
        </Combobox.Target>

        <Combobox.Dropdown>
          <div className="px-3 py-2">
            <div className="flex items-center gap-3 mb-2">
              <ProfilePicture
                size="md"
                alt="User Profile"
                imageUrl={iconUser.src}
              />
              <div className="flex flex-col">
                <Text fw={500}>{user?.name || "User"}</Text>
                <Text size="xs" c="dimmed">
                  {user?.phone_number || "-"}
                </Text>
              </div>
            </div>
            <Divider my="xs" />
          </div>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}
