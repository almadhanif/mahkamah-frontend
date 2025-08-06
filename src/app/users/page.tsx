/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import {
  Button,
  Group,
  Modal,
  Table,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Networks from "@/lib/api/network-factory";
import { KRAKATAU_SERVICE } from "@/lib/api/endpoint";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userService = Networks("service");

  // Get users data
  const {
    data: users = [],
    isLoading,
    refetch,
  } = userService.useQuery<User[]>(KRAKATAU_SERVICE.GET.getAllUsers, [
    "users",
  ]);

  // Setup mutations
  const { mutateAsync: createUser, isPending: isCreating } =
    userService.useMutation("post");
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
        endpoint: `/user/${editingUser.id}`,
        data: values,
      });
    } else {
      // Create user
      await createUser({
        endpoint: "/user/create",
        data: values,
      });
    }

    // Close modal and refetch data
    setIsModalOpen(false);
    setEditingUser(null);
    form.reset();
    userService.invalidate(["users"]);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setValues({
      name: user.name,
      email: user.email,
      role: user.role,
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
    <div>
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

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
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
                      onClick={() => handleDelete(user.id)}
                      loading={isDeleting}
                    >
                      Delete
                    </Button>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

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
            <Button type="submit" loading={isCreating || isUpdating}>
              {editingUser ? "Update" : "Create"}
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
}
