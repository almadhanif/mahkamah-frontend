"use client";

import { useState } from "react";
import {
  Box,
  Stack,
  ActionIcon,
  Tooltip,
  Modal,
  TextInput,
  Button,
  Group,
  Loader,
  Text,
  NavLink,
  Divider,
} from "@mantine/core";
import { Tree, RenderTreeNodePayload } from "@mantine/core";
import Networks from "@/lib/api/network-factory";
import { DOCUMENT_SERVICE } from "@/lib/api/endpoint";
import { Icon } from "@iconify/react/dist/iconify.js";
import { notifications } from "@mantine/notifications";
import NiceModal from "@ebay/nice-modal-react";
import MODAL_IDS from "../ui/Modals/modalIds";
import { useFolderStore } from "@/store/folder/folderStore";

interface SidebarProps {
  minimized: boolean;
  setMinimized: React.Dispatch<React.SetStateAction<boolean>>;
}

type FolderNode = {
  id: number;
  name: string;
  parent_id: number | null;
  children?: FolderNode[];
};

export default function Sidebar({
  minimized,
  setMinimized,
}: SidebarProps) {
  const { selectedFolderId, setSelectedFolderId } = useFolderStore();

  const [currentParentId, setCurrentParentId] = useState<
    number | null
  >(null);

  // State untuk modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // State untuk data modal
  const [newName, setNewName] = useState("");
  const [actionTarget, setActionTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const service = Networks("service");

  // Fetching data
  const { data, isLoading, refetch } = service.useQuery(
    DOCUMENT_SERVICE.GET.getAllFolders,
    ["folders"],
  );

  // --- Mutations untuk Create, Update, Delete ---
  const onSuccess = {
    onSuccess: () => {
      refetch();
      notifications.show({
        title: "Sukses",
        message: "Operasi berhasil dilakukan",
        color: "green",
      });
    },
    onError: (error: { message?: string }) => {
      notifications.show({
        title: "Error",
        message: error?.message ?? "Operation failed",
        color: "red",
      });
    },
  };

  const createMutation = service.useMutation("post", onSuccess);
  const updateMutation = service.useMutation("put", onSuccess);
  const deleteMutation = service.useMutation("delete", onSuccess);

  const handleAddFolder = async () => {
    if (!newName.trim()) return;

    // parentId sekarang diambil dari state, bukan dari parameter boolean
    await createMutation.mutateAsync({
      endpoint: DOCUMENT_SERVICE.POST.createFolder,
      data: { parentId: currentParentId, name: newName.trim() },
    });

    setNewName("");
    setAddModalOpen(false);
    setActionModalOpen(false);
    setCurrentParentId(null);
  };

  const handleUpdateFolder = async () => {
    if (!newName.trim() || !actionTarget) return;

    await updateMutation.mutateAsync({
      endpoint: DOCUMENT_SERVICE.PUT.updateFolder(actionTarget.id),
      data: { name: newName.trim() },
    });

    setNewName("");
    setEditModalOpen(false);
    setActionModalOpen(false); // Tutup juga modal aksi utama
  };

  // Ganti fungsi handleDeleteFolder yang lama dengan ini

  const handleDeleteFolder = async () => {
    if (!actionTarget) return;

    try {
      await NiceModal.show(MODAL_IDS.GENERAL.CONFIRMATION, {
        message: `Apakah Anda yakin ingin menghapus folder "${actionTarget.name}"?`,
        subMessage:
          "Semua subfolder dan dokumen di dalamnya juga akan dihapus.",
        variant: "danger",
        handleClose: () => {
          NiceModal.hide(MODAL_IDS.GENERAL.CONFIRMATION);
          setActionModalOpen(false);
        },
        handleConfirm: async () => {
          await deleteMutation.mutateAsync({
            endpoint: DOCUMENT_SERVICE.DELETE.deleteFolder(
              actionTarget.id,
            ),
          });
          setActionModalOpen(false);
          setSelectedFolderId(null);
          NiceModal.hide(MODAL_IDS.GENERAL.CONFIRMATION);
        },
      });
    } catch {
      setActionModalOpen(false);
      NiceModal.hide(MODAL_IDS.GENERAL.CONFIRMATION);
    }
  };

  const mapped = Array.isArray(data)
    ? mapToTreeData(data as FolderNode[])
    : [];

  function mapToTreeData(nodes: FolderNode[]): {
    label: string;
    value: string;
    children?: ReturnType<typeof mapToTreeData>;
  }[] {
    return nodes.map((n) => ({
      label: n.name,
      value: String(n.id),
      children:
        n.children && n.children.length > 0
          ? mapToTreeData(n.children)
          : undefined,
    }));
  }

  function Leaf({ node, elementProps }: RenderTreeNodePayload) {
    return (
      <div className="px-2 flex justify-between items-center w-full py-1 group">
        <div
          {...elementProps}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexGrow: 1,
          }}
          onClick={(e) => {
            elementProps.onClick?.(e);
            setTimeout(
              () =>
                setSelectedFolderId(
                  node.value ? Number(node.value) : null,
                ),
              0,
            );
          }}
        >
          <Icon
            icon={"material-symbols:folder"}
            width={24}
            height={24}
            className="text-yellow-400"
          />
          <span className="text-sm">
            {minimized ? "" : node.label}
          </span>
        </div>
        <ActionIcon
          size="sm"
          variant="transparent"
          color="black"
          className="opacity-0 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            setActionTarget({
              id: node.value,
              name: String(node.label),
            });
            setActionModalOpen(true);
          }}
        >
          <Icon
            icon="pepicons-pencil:dots-y"
            width="20"
            height="20"
          />
        </ActionIcon>
      </div>
    );
  }

  return (
    <Box
      style={{ position: "relative", height: "100vh", width: "100%" }}
    >
      <Box
        h="100%"
        py="md"
        pl="xs"
        pr="xs"
        bg="gray.0"
        style={{
          borderRight: "1px solid var(--mantine-color-gray-3)",
          width: "100%",
          transition: "all 0.2s ease",
        }}
      >
        <Stack gap="xs" align="stretch">
          <Group
            justify="space-between"
            style={{ padding: "0 8px" }}
            className="flex items-center"
          >
            <Text fw={500} size="sm">
              Pustaka
            </Text>
            <Button
              variant="subtle"
              size="xs"
              leftSection={
                <Icon
                  icon="ic:baseline-plus"
                  width="24"
                  height="24"
                  style={{ marginLeft: minimized ? 14 : 0 }}
                />
              }
              onClick={() => {
                setCurrentParentId(null);
                setAddModalOpen(true);
              }}
              disabled={isLoading}
            >
              Tambah
            </Button>
          </Group>
          <Divider />
          <Box
            style={{
              padding: 8,
              overflowY: "auto",
              height: "calc(100vh - 180px)",
            }}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <NavLink
                  label={!minimized && "Home"}
                  leftSection={
                    <Icon
                      icon="famicons:home"
                      width={24}
                      height={24}
                    />
                  }
                  onClick={() => setSelectedFolderId(null)}
                  pl={8}
                  autoContrast
                  active={selectedFolderId === null}
                  fw={selectedFolderId === null ? 600 : 400}
                />
                <Tree
                  data={mapped}
                  selectOnClick
                  clearSelectionOnOutsideClick
                  onChange={(value) => {
                    if (typeof value === "string" || value === null) {
                      setSelectedFolderId(
                        value ? Number(value) : null,
                      );
                    }
                  }}
                  renderNode={(payload) => <Leaf {...payload} />}
                  classNames={{
                    label:
                      "px-2 rounded-md [&[data-selected='true']]:text-black [&[data-selected='true']]:font-semibold ",
                  }}
                />
              </>
            )}
          </Box>
        </Stack>
      </Box>

      {/* Modal Tambah Folder (Root) */}
      <Modal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title={
          currentParentId === null
            ? "Tambah Folder Baru"
            : "Tambah Subfolder Baru"
        }
      >
        <TextInput
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nama folder"
          data-autofocus
        />
        <Group justify="flex-end" mt="md">
          <Button
            variant="default"
            onClick={() => setAddModalOpen(false)}
          >
            Batal
          </Button>
          <Button
            onClick={handleAddFolder}
            loading={createMutation.isPending}
          >
            Tambah
          </Button>
        </Group>
      </Modal>

      {/* Modal Aksi Folder */}
      <Modal
        opened={actionModalOpen}
        onClose={() => setActionModalOpen(false)}
        title={
          <span style={{ fontWeight: "600" }}>
            Folder {actionTarget?.name}
          </span>
        }
        size="md"
      >
        <Stack>
          <Button
            variant="default"
            onClick={() => {
              if (actionTarget) {
                setCurrentParentId(Number(actionTarget.id));
              }
              setAddModalOpen(true);
              setActionModalOpen(false);
            }}
            leftSection={
              <Icon
                icon="material-symbols:folder-outline"
                width="24"
                height="24"
              />
            }
            styles={{
              label: { fontWeight: "400" },
            }}
          >
            Tambah Subfolder
          </Button>
          <Button
            variant="default"
            onClick={() => {
              setNewName(actionTarget?.name || "");
              setEditModalOpen(true);
              setActionModalOpen(false);
            }}
            leftSection={
              <Icon icon="uil:edit" width="24" height="24" />
            }
            styles={{
              label: { fontWeight: "400" },
            }}
          >
            Edit Nama Folder
          </Button>
          <Button
            color="red"
            onClick={handleDeleteFolder}
            loading={deleteMutation.isPending}
            leftSection={
              <Icon
                icon="material-symbols:delete-outline"
                width="24"
                height="24"
              />
            }
            styles={{
              label: { fontWeight: "400" },
            }}
          >
            Hapus Folder
          </Button>
        </Stack>
      </Modal>

      {/* Modal Edit Nama */}
      <Modal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={`Edit Nama "${actionTarget?.name}"`}
      >
        <TextInput
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nama folder baru"
          data-autofocus
        />
        <Group justify="flex-end" mt="md">
          <Button
            variant="default"
            onClick={() => setEditModalOpen(false)}
          >
            Batal
          </Button>
          <Button
            onClick={handleUpdateFolder}
            loading={updateMutation.isPending}
          >
            Simpan
          </Button>
        </Group>
      </Modal>

      {/* Toggle Button - Positioned on the border */}
      <Tooltip
        label={minimized ? "Expand sidebar" : "Collapse sidebar"}
        position="right"
      >
        <ActionIcon
          variant="filled"
          color="blue"
          size="md"
          radius="xl"
          onClick={() => setMinimized((prev) => !prev)}
          aria-label={
            minimized ? "Expand sidebar" : "Collapse sidebar"
          }
          style={{
            position: "absolute",
            top: "50%",
            right: -12,
            transform: "translateY(-50%)",
            zIndex: 1000,
            background: "white",
            border: "2px solid var(--mantine-color-gray-3)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            transition: "all 0.2s ease",
          }}
        >
          <Icon
            icon={
              minimized
                ? "material-symbols:chevron-right"
                : "material-symbols:chevron-left"
            }
            width={16}
            height={16}
            style={{
              color: "var(--mantine-color-gray-7)",
            }}
          />
        </ActionIcon>
      </Tooltip>
    </Box>
  );
}
