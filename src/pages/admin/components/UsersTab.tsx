import { useEffect, useState } from "react";
import { BaseText } from "../../../components/base/text/BaseText";
import type { User } from "../../../models/user";
import { fetchAll as fetchAllUsers } from "../../../repositories/user";
import { ErrorHelper } from "../../../helper/errorHelper.js";

const UsersTab = function UsersTab() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    void loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await fetchAllUsers({});
      setUsers(data);
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {users.map((user, index) => {
        // const statusLabel = user.verified ? verifiedLabel : pendingLabel;
        return (
          <div
            key={user.id ?? index}
            className="rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3 shadow-sm transition-colors hover:bg-slate-800/70"
          >
            <BaseText fontWeight="semibold">{user.name}</BaseText>
            <BaseText fontSize="sm" color="gray-400">
              {user.email}
            </BaseText>
            <BaseText fontSize="xs" color="gray-500">
              {/* {`${roleLabel}: ${user.role}`}{" | "}
              {statusLabel} */}
            </BaseText>
          </div>
        );
      })}
    </div>
  );
};

export { UsersTab };
