"use client";

import { useFolderStore } from "@/store/folder/folderStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Paper, Stack, Text } from "@mantine/core";

type Folder = {
  id: number;
  name: string;
};

interface FolderCardProps {
  folder: Folder;
}

export default function FolderCard({ folder }: FolderCardProps) {
  const { setSelectedFolderId } = useFolderStore();

  return (
    <Paper
      onClick={() => setSelectedFolderId(folder.id)}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      <Stack align="center" gap="sm">
        <Icon
          icon="material-symbols:folder"
          width="64"
          height="64"
          className="text-yellow-400"
        />
        <Text
          size="sm"
          fw={500}
          autoCapitalize="words"
          className="text-foreground"
          truncate
        >
          {folder.name}
        </Text>
      </Stack>
    </Paper>
  );
}
