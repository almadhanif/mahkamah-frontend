"use client";

import { useState } from "react";
import {
  Button,
  Container,
  Group,
  Modal,
  Skeleton,
  Table,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Networks from "@/lib/api/network-factory";
import { DOCUMENT_SERVICE } from "@/lib/api/endpoint";
import { User } from "@/types/types";

export default function UsersPage() {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userService = Networks("service");

  // Get users data
  const {
    data: users = [],
    isLoading,
    refetch,
  } = userService.useQuery<User[]>(DOCUMENT_SERVICE.GET.getAllUsers, [
    "users",
  ]);

  // Setup mutations
  const { mutateAsync, isPending } = userService.useMutation("post");
  const { mutateAsync: updateUser, isPending: isUpdating } =
    userService.useMutation("put");
  const { mutateAsync: deleteUser, isPending: isDeleting } =
    userService.useMutation("delete");

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      role: "",
    },
    validate: {
      name: (value) => (!value ? "Name is required" : null),
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      role: (value) => (!value ? "Role is required" : null),
    },
  });

  const handleSubmit = async (values: {
    name: string;
    email: string;
    role: string;
  }) => {
    if (editingUser) {
      // Update user
      await updateUser({
        endpoint: `/user/${editingUser.user_id}`,
        data: values,
      });
    } else {
      // Create user
      await mutateAsync({
        endpoint: DOCUMENT_SERVICE.POST.registerUser,
        data: values,
      });
    }

    // Close modal and refetch data
    setIsModalOpen(false);
    setEditingUser(null);
    form.reset();
    refetch();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setValues({
      name: user.name,
      email: user.email,
      role: user.role_code,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (userId: number) => {
    await deleteUser({
      endpoint: `/user/${userId}`,
    });
    userService.invalidate(["users"]);
  };

  return (
    <Container fluid py="sm">
      <Group mb="md">
        <h1>Users</h1>
        <Button
          onClick={() => {
            setEditingUser(null);
            form.reset();
            setIsModalOpen(true);
          }}
        >
          Add User
        </Button>
      </Group>

      <Skeleton visible={isLoading} height={300}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {users?.map((user: User) => (
              <Table.Tr key={user.user_id}>
                <Table.Td className="capitalize">
                  {user.name}
                </Table.Td>
                <Table.Td>{user.email}</Table.Td>
                <Table.Td>{user.role_code}</Table.Td>
                <Table.Td>
                  <Group>
                    <Button
                      size="xs"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      color="red"
                      onClick={() => handleDelete(user.user_id)}
                      loading={isDeleting}
                    >
                      Delete
                    </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Skeleton>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? "Edit User" : "Add User"}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Name"
            placeholder="John Doe"
            {...form.getInputProps("name")}
            mb="md"
          />
          <TextInput
            label="Email"
            placeholder="john@example.com"
            {...form.getInputProps("email")}
            mb="md"
          />
          <TextInput
            label="Role"
            placeholder="admin"
            {...form.getInputProps("role")}
            mb="md"
          />
          <Group>
            <Button type="submit" loading={isPending || isUpdating}>
              {editingUser ? "Update" : "Create"}
            </Button>
          </Group>
        </form>
      </Modal>
    </Container>
  );
}
