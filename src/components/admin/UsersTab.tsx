import { useEffect, useState } from "react";
import type { User, UserCreate } from "../../models/user";
import {
  fetchAll,
  deleteOne,
  createOne
} from "../../repositories/user";
import { ErrorHelper } from "../../helper/errorHelper.js";
import { TransparentCard } from "../layout/TransparentCard";
import { UserItem } from "./UserItem";
import { BaseButtonAdd } from "../base/button/BaseButtonAdd";

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

  async function handleAdd() {
    try {
      const newItem: UserCreate = { name: "test", email: 'email', password_hash: "2b$12$F0iVmf7fE6RuOFTNOy/wk.yuwXgLjKx/XCgkGHpXIKcuE03Us3kfy" }
      await createOne(newItem);
      loadUsers();
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  return (
    <TransparentCard direction="col" gap="2">
      <BaseButtonAdd onClick={handleAdd} />
      <TransparentCard direction="col" gap="2">
        {users.map((user, index) => (
          <UserItem
            key={user.id ?? index}
            user={user}
            handleDelete={handleDelete}
          />
        ))}
      </TransparentCard>
    </TransparentCard>
  );
};

export { UsersTab };
