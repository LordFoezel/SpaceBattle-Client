import { checkRole, Role } from "../../auth/auth.js";
import type { ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

const AdminRoleChecker = function AdminRoleChecker({
    children,
}: Props) {

    if (checkRole(["admin"])) {
        return (
            { children }
        );
    }
    return;
};

export { AdminRoleChecker };
