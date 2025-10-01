"use client";

import {
  Paper,
  Text,
  Stack,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { File } from "@/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import FileIcon from "@/components/ui/FileIcon";

// Helper untuk format ukuran file
function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  );
}

export default function FileListItem({ file }: { file: File }) {
  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      className="relative cursor-pointer transition-all hover:shadow-md hover:-translate-y-1 group"
    >
      <Stack align="center" gap="xs">
        {/* Gunakan komponen FileIcon di sini */}
        <FileIcon mimetype={file.file_type} size={64} />

        <Tooltip label={file.name} openDelay={500}>
          <Text size="sm" ta="center" fw={500} truncate="end">
            {file.name}
          </Text>
        </Tooltip>

        <Text size="xs" c="dimmed">
          {formatBytes(file.file_size)}
        </Text>
      </Stack>

      {/* Tombol aksi yang muncul saat hover */}
      <ActionIcon
        variant="subtle"
        color="gray"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation(); // Mencegah item diklik saat tombol aksi diklik
          console.log("Action on file:", file.name);
        }}
      >
        <Icon icon="mdi:dots-vertical" width="20" height="20" />
      </ActionIcon>
    </Paper>
  );
}
