import { AuthTokenHelper } from "./authToken.js";

export function SelfCheck(toCHeck: {userId?: number, playerId?: number}) {
    if (toCHeck.userId) {
        console.log(toCHeck, 'toCHeck');
        const { id } = AuthTokenHelper.getUserIdentity();
        if (toCHeck.userId !== id) return false;
    }
    if (toCHeck.playerId) {
        const playerIdStr = window.localStorage.getItem("spacebattle.playerId");
        console.log(playerIdStr, 'playerIdStr', toCHeck.playerId, Number(playerIdStr) , toCHeck.playerId !== Number(playerIdStr));
        if (toCHeck.playerId !== Number(playerIdStr)) return false;
    }
    return true;
}