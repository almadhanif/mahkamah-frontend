/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Avatar, MantineSize } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

interface ProfilePictureProps {
  imageUrl?: string | null;
  alt: string;
  withBadge?: boolean;
  badgeIcon?: React.ReactNode;
  name?: any;
  size?: MantineSize;
  radius?: MantineSize;
  className?: string;
}

function ProfilePicture({
  imageUrl,
  alt,
  withBadge = false,
  badgeIcon,
  name,
  size,
  radius,
  className,
}: ProfilePictureProps) {
  const getInitial = (string: string | undefined) => {
    if (string)
      return string
        .split(" ")
        .slice(0, 2)
        .map((item) => item[0])
        .join("")
        .toUpperCase();

    return "A";
  };

  return (
    <div className={twMerge("relative h-fit", className)}>
      {imageUrl ? (
        <Image src={imageUrl} alt={alt} width={40} height={40} />
      ) : (
        <Avatar size={size} radius={radius}>
          {getInitial(name)}
        </Avatar>
      )}
      {withBadge && (
        <div className="absolute -bottom-1 right-0">{badgeIcon}</div>
      )}
    </div>
  );
}

export default ProfilePicture;
