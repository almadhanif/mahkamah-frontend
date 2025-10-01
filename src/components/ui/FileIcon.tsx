"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

interface FileIconProps {
  mimetype: string | null;
  size?: number;
}

export default function FileIcon({
  mimetype,
  size = 64,
}: FileIconProps) {
  let icon = "mdi:file-outline";
  let color = "text-gray-500";

  if (!mimetype) {
    return (
      <Icon
        icon={icon}
        width={size}
        height={size}
        className={color}
      />
    );
  }

  // --- Logika Pemilihan Ikon Berdasarkan Mimetype ---

  if (mimetype.startsWith("image/")) {
    icon = "mdi:file-image-outline";
    color = "text-purple-500";
  } else if (mimetype.startsWith("video/")) {
    icon = "mdi:file-video-outline";
    color = "text-cyan-500";
  } else if (mimetype.startsWith("audio/")) {
    icon = "mdi:file-music-outline";
    color = "text-pink-500";
  } else {
    switch (mimetype) {
      case "application/pdf":
        icon = "mdi:file-pdf-box";
        color = "text-red-600";
        break;
      // Microsoft Word
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        icon = "mdi:file-word-box";
        color = "text-blue-600";
        break;
      // Microsoft Excel
      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        icon = "mdi:file-excel-box";
        color = "text-green-600";
        break;
      // Microsoft PowerPoint
      case "application/vnd.ms-powerpoint":
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        icon = "mdi:file-powerpoint-box";
        color = "text-orange-500";
        break;
      // ZIP / Archive
      case "application/zip":
      case "application/x-zip-compressed":
      case "application/x-rar-compressed":
        icon = "mdi:folder-zip-outline";
        color = "text-yellow-600";
        break;
      // Text files
      case "text/plain":
      case "text/csv":
        icon = "mdi:file-document-outline";
        color = "text-gray-600";
        break;
      default:
        // Fallback ke ikon file generik
        icon = "mdi:file-outline";
        color = "text-gray-500";
        break;
    }
  }

  return (
    <Icon icon={icon} width={size} height={size} className={color} />
  );
}
