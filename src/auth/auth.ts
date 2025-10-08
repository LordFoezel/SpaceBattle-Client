import { AuthTokenHelper } from "../helper/authToken.js";

export type Role = 'admin' | 'player';

function getRole(): Role {
    try {
        const { role } = AuthTokenHelper.getUserIdentity();
        return role as Role;
    } catch {
        return 'player';
    }
}

export function checkRole(reqired: Role[]): boolean {
    const self: Role = getRole();
    if (reqired.find((r) => r === self)) return true;
    return false;
}
