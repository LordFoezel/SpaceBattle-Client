import { checkRole } from "../../auth/auth.js";
import type { ReactNode } from "react";
import { BaseRoleChecker } from "../base/roleChecker/BaseRoleChecker.js";

interface Props {
    children?: ReactNode;
}

const AdminRoleChecker = function AdminRoleChecker({
    children,
}: Props) {

    return (
        <BaseRoleChecker requiredRoles={["admin"]}>{children}</BaseRoleChecker>
    );
}

export { AdminRoleChecker };
