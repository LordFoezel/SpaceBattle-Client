import { useEffect, useState } from "react";
import type { User } from "../../models/user";
import {
  fetchAll,
  deleteOne,
  updateOne,
} from "../../repositories/user";
import { ErrorHelper } from "../../helper/errorHelper.js";
import { TransparentCard } from "../layout/TransparentCard";
import { UserItem } from "./UserItem";
import { AddUserModal } from "./AddUserModal";

const UsersTab = function UsersTab() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await fetchAll({});
      setUsers(data);
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteOne(id);
      loadUsers();
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  async function handleUpdate(update: { id: number;[key: string]: any }) {
    const { id, ...payload } = update;
    try {
      await updateOne(id, payload);
      loadUsers();
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  return (
    <TransparentCard direction="col" gap="2">
      <AddUserModal onCreated={loadUsers} />
      <TransparentCard direction="col" gap="2">
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))}
      </TransparentCard>
    </TransparentCard>
  );
};

export { UsersTab };
