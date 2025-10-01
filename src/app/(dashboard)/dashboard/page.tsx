"use client";

import { DOCUMENT_SERVICE } from "@/lib/api/endpoint";
import Networks from "@/lib/api/network-factory";
import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import { findFolderById } from "@/lib/utils/folderUtils";
import NoItems from "@/components/ui/Errors/NoItems";
import FileListItem from "@/components/layout/dashboard/FileListItem";
import { useFolderStore } from "@/store/folder/folderStore";
import { File, FileResponse, Folder } from "@/types/types";
import FolderCard from "@/components/layout/dashboard/folderCard";
import { useMemo, useCallback } from "react";

function DashboardPage() {
  const { selectedFolderId, setSelectedFolderId } = useFolderStore();
  const service = Networks("service");

  // 1. Stabilkan endpoint dengan useCallback
  const folderEndpoint = useMemo(
    () => DOCUMENT_SERVICE.GET.getAllFolders,
    [],
  );

  // 2. Stabilkan query key dengan useMemo
  const folderQueryKey = useMemo(() => ["getAllFolders"], []);

  // Query untuk mengambil SEMUA folder (struktur pohon)
  const { data: allFolders, isLoading: isLoadingFolders } =
    service.useQuery<Folder[]>(folderEndpoint, folderQueryKey, {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
    });

  // 5. Stabilkan file endpoint dan query key
  const fileEndpoint = useMemo(
    () =>
      selectedFolderId
        ? DOCUMENT_SERVICE.GET.getAllFilesByFolderId(selectedFolderId)
        : null,
    [selectedFolderId],
  );

  const fileQueryKey = useMemo(
    () => ["getAllFilesByFolderId", selectedFolderId],
    [selectedFolderId],
  );

  // Query untuk mengambil file, hanya aktif jika folder dipilih
  const { data: fileResponse, isLoading: isLoadingFiles } =
    service.useQuery<FileResponse>(fileEndpoint || "", fileQueryKey, {
      enabled: !!selectedFolderId,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
    });

  // --- LOGIKA UTAMA ---

  // 1. Cari data folder yang sedang aktif dari `allFolders` (gunakan useMemo)
  const currentFolder = useMemo(
    () =>
      allFolders
        ? findFolderById(allFolders, selectedFolderId)
        : null,
    [allFolders, selectedFolderId],
  );

  // 2. Tentukan folder yang akan ditampilkan (gunakan useMemo)
  const foldersToShow = useMemo(
    () =>
      currentFolder
        ? currentFolder.children
        : allFolders?.filter((f: Folder) => !f.parent_id),
    [currentFolder, allFolders],
  );

  // 3. Tentukan judul halaman (gunakan useMemo)
  const pageTitle = useMemo(
    () =>
      currentFolder
        ? currentFolder.name
        : "Sistem Analisis Dokumen Canggih",
    [currentFolder],
  );

  // 4. Ekstrak files dari response (gunakan useMemo)
  const files = useMemo(
    () => fileResponse?.content?.files || [],
    [fileResponse],
  );
  // 5. Handler untuk breadcrumb click (gunakan useCallback)
  const handleBreadcrumbClick = useCallback(
    (id: number | null) => {
      setSelectedFolderId(id);
    },
    [setSelectedFolderId],
  );

  // 6. Membuat jalur breadcrumbs
  const breadcrumbItems = useMemo(() => {
    if (!allFolders) return [];

    // Fungsi rekursif untuk mencari jalur folder
    const findPath = (
      folders: Folder[],
      targetId: number | null,
      path: Folder[] = [],
    ): Folder[] | null => {
      if (!targetId) return null;

      for (const folder of folders) {
        if (folder.id === targetId) {
          return [...path, folder];
        }

        if (folder.children && folder.children.length > 0) {
          const foundPath = findPath(folder.children, targetId, [
            ...path,
            folder,
          ]);
          if (foundPath) return foundPath;
        }
      }
      return null;
    };

    // Jika tidak ada folder yang dipilih, kembalikan array kosong
    if (!selectedFolderId) return [];

    // Temukan jalur ke folder yang dipilih
    const path = findPath(allFolders, selectedFolderId);
    return path || [];
  }, [allFolders, selectedFolderId]);

  // --- RENDER SECTION ---

  if (isLoadingFolders) {
    return (
      <Center style={{ height: "80vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (!allFolders || allFolders.length === 0) {
    return (
      <Container fluid py="md">
        {/* Header Tetap Ditampilkan */}
        <Box>
          <Title size="xl" fw={700}>
            Sistem Analisis Dokumen Canggih
          </Title>
          <Text size="sm" c="dimmed">
            Sebuah sistem analisis dokumen canggih yang didukung oleh
            AI (Artificial Intelligence)
          </Text>
        </Box>
        <Divider className="my-3" />
        <Center>
          <NoItems label="Tidak ada folder. Silakan buat folder baru di sidebar." />
        </Center>
      </Container>
    );
  }

  return (
    <Container fluid py="md">
      <Box>
        <Title size="xl" fw={700}>
          {pageTitle}
        </Title>
        <Text size="sm" c="dimmed">
          Sebuah sistem analisis dokumen canggih yang didukung oleh AI
          (Artificial Intelligence). Kelola folder dan file Anda di
          sini
        </Text>
      </Box>
      <Divider className="my-3" />

      {/* Breadcrumbs Navigation */}
      {selectedFolderId && (
        <Box mb="md">
          <Breadcrumbs separator=">" aria-label="Breadcrumb">
            <Anchor
              component="button"
              onClick={() => handleBreadcrumbClick(null)}
              c="slate"
            >
              Home
            </Anchor>

            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;

              return isLast ? (
                <Text key={item.id} fw={600} c="black">
                  {item.name}
                </Text>
              ) : (
                <Anchor
                  key={item.id}
                  component="button"
                  onClick={() => handleBreadcrumbClick(item.id)}
                  c="slate"
                >
                  {item.name}
                </Anchor>
              );
            })}
          </Breadcrumbs>
        </Box>
      )}

      {/* Bagian Folder */}
      <Stack gap="md">
        <Text fw={600}>Folders</Text>
        {foldersToShow && foldersToShow.length > 0 ? (
          <Flex gap="lg" justify="flex-start" wrap="wrap">
            {foldersToShow.map((folder: Folder) => (
              <div key={folder.id}>
                <FolderCard folder={folder} />
              </div>
            ))}
          </Flex>
        ) : (
          <NoItems label="Tidak ada folder. Silakan buat folder baru di sidebar." />
        )}
      </Stack>

      {/* Bagian File (hanya tampil jika ada folder yang dipilih) */}
      {selectedFolderId && (
        <>
          <Divider my="xl" />
          <Stack gap="md">
            <Text fw={600}>Files</Text>
            {isLoadingFiles ? (
              <Loader />
            ) : files.length > 0 ? (
              <SimpleGrid
                cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
                spacing="md"
              >
                {files.map((file: File) => (
                  <FileListItem key={file.file_id} file={file} />
                ))}
              </SimpleGrid>
            ) : (
              <NoItems label="Tidak ada file di folder ini." />
            )}
          </Stack>
        </>
      )}
    </Container>
  );
}

export default DashboardPage;
