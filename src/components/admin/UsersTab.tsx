import { useEffect, useState } from "react";
import { BaseText } from "../base/text/BaseText";
import { BaseButtonDelete } from "../base/button/BaseButtonDelete";
import type { User } from "../../models/user";
import {
  fetchAll as fetchAllUsers,
  deleteOne as deleteUser,
} from "../../repositories/user";
import { ErrorHelper } from "../../helper/errorHelper.js";

const UsersTab = function UsersTab() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await fetchAllUsers({});
      setUsers(data);
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteUser(id);
      loadUsers();
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {users.map((user, index) => {
        return (
          <div
            key={user.id ?? index}
            className="rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3 shadow-sm transition-colors hover:bg-slate-800/70"
          >
            <div className="flex items-start justify-between gap-3">
              <BaseText fontWeight="semibold">{user.name}</BaseText>
              {user.id != null && (
                <BaseButtonDelete
                  id={user.id}
                  onClick={handleDelete}
                />
              )}
            </div>
            <BaseText fontSize="sm" color="gray-400">
              {user.email}
            </BaseText>
            <BaseText fontSize="xs" color="gray-500">
              {`${user.name}: ${user.role}`}{" | "}
              {user.verified}
            </BaseText>
          </div>
        );
      })}
    </div>
  );
};

export { UsersTab };
