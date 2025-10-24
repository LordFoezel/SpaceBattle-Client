import { checkRole, Role } from "src/auth/auth.js";
import type { ReactNode } from "react";

interface Props {
    requiredRoles: Role[];
    children?: ReactNode;
}

const BaseRoleChecker = function BaseRoleChecker({
    requiredRoles = ["admin", "player"],
    children,
}: Props) {

    if (checkRole(requiredRoles)) {
        return (
            { children }
        );
    }
    return;
};

export { BaseRoleChecker };
