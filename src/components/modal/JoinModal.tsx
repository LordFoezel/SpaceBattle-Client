import { BaseModal } from "../base/modal/BaseModal";
import { TransparentCard } from "../layout/TransparentCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordLabel } from "../label/PasswordLabel";
import { fetchById as fetchMatchById } from "../../repositories/matches";
import { createOne as createPlayer } from "../../repositories/players";
import { ErrorHelper } from "../../helper/errorHelper";
import { AuthTokenHelper } from "../../helper/authToken.js";
import { fetchOne as fetchOneFleet, createOne as createOneFleet } from "../../repositories/fleet";
import {
    fetchAll as fetchConfig,
} from "../../repositories/config_fleet_ship";
import { fetchOne as fetchPlayer } from "../../repositories/players";
import { ShipDirection } from "../../models/fleet";
import { checkMatchState } from "../../helper/matchState";

interface JoinModalProps {
    matchId: number;
    disabledSave?: boolean;
}

const JoinModal = function JoinModal(props: JoinModalProps) {
    const {
        matchId,
        disabledSave = false,
    } = props;

    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function onClose() {
        setPassword("");
    }

    function onConfirm() {
        (async () => {
            try {
                const match = await fetchMatchById(matchId);
                if (!match) {
                    globalThis.notify.error(globalThis.t("error.notFound", ["core.match"]));
                    return;
                }
                const destinationPath = checkMatchState(match);
                if (match.password_hash && match.password_hash !== password) {
                    globalThis.notify.warning(globalThis.t("error.code.INVALID_CREDENTIALS"));
                    return;
                }

                const { id: userId, name: userName } = AuthTokenHelper.getUserIdentity();

                try {
                    const player = await fetchPlayer({ where: { userId, matchId } });
                    if (player) {
                        window.localStorage.setItem("spacebattle.playerId", `${player.id}`);
                        const shipConfigs = await fetchConfig({ config_fleet_id: match.config.fleet_config_id });
                        for (const shipConfig of shipConfigs) {
                            if (shipConfig.count === 0) continue;
                            let count = 1;
                            while (count <= shipConfig.count) {
                                const ident = `${player.id}_${match.id}_${shipConfig.ship_id}_${count}`;
                                const existingFleet = await fetchOneFleet({ where: { ident } });
                                if (!existingFleet) {
                                    await createOneFleet({ ident, player_id: player.id, match_id: match.id, ship_id: shipConfig.ship_id, position: null, direction: ShipDirection.HORIZONTAL })
                                }
                                count++;
                            }
                        };
                        navigate(destinationPath, { replace: true });
                        return;
                    }
                } catch (error) {
                    ErrorHelper.handleError(error);
                }

                const maxPlayers = match.config?.player_count ?? 0;
                const currentPlayers = match.current_player_count ?? 0;
                if (maxPlayers > 0 && currentPlayers >= maxPlayers) {
                    globalThis.notify.warning(globalThis.t("error.code.MATCH_FULL") ?? globalThis.t("core.full"));
                    return;
                }


                const newPlayer = await createPlayer({
                    name: userName,
                    user_id: userId,
                    match_id: match.id,
                });

                window.localStorage.setItem("spacebattle.playerId", `${newPlayer.id}`);
                const shipConfigs = await fetchConfig({ config_fleet_id: match.config.fleet_config_id });
                for (const shipConfig of shipConfigs) {
                    if (shipConfig.count === 0) continue;
                    let count = 1;
                    while (count <= shipConfig.count) {
                        const ident = `${newPlayer.id}_${match.id}_${shipConfig.ship_id}_${count}`;
                        const existingFleet = await fetchOneFleet({ where: { ident } });
                        if (!existingFleet) {
                            await createOneFleet({ ident, player_id: newPlayer.id, match_id: match.id, ship_id: shipConfig.ship_id, position: null, direction: ShipDirection.HORIZONTAL })
                        }
                        count++;
                    }
                };
                navigate(destinationPath, { replace: true });
            } catch (error) {
                ErrorHelper.handleError(error);
            }
        })();
    }

    return (
        <BaseModal buttonText={globalThis.t("lobby.join")} title={globalThis.t("lobby.join")} placement="top" onClose={onClose} onConfirm={onConfirm} confirmText={globalThis.t("lobby.join")} disabledSave={disabledSave}>
            <TransparentCard direction="col" gap="2">
                <PasswordLabel value={password} onChange={(e) => setPassword(e.target.value)} />
            </TransparentCard>
        </BaseModal>
    );
};

export { JoinModal };
