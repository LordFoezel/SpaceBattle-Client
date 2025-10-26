import { AuthTokenHelper } from "./authToken.js";

export function SelfCheck(toCHeck: {userId?: number, playerId?: number}) {
    if (toCHeck.userId) {
        const { id } = AuthTokenHelper.getUserIdentity();
        if (toCHeck.userId !== id) return false;
    }
    if (toCHeck.playerId) {
        const playerIdStr = window.localStorage.getItem("spacebattle.playerId");
        if (toCHeck.playerId !== Number(playerIdStr)) return false;
    }
    return true;
}