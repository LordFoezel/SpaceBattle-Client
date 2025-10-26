import { AuthTokenHelper } from "./authToken.js";

export function SelfCheck(userId?: number, playerId?: number) {
    if (userId) {
        const { id } = AuthTokenHelper.getUserIdentity();
        if (userId !== id) return false;
    }
    if (playerId) {
        const { playerId: plId } = AuthTokenHelper.getUserIdentity();
        if (playerId !== plId) return false;
    }
    return true;
}