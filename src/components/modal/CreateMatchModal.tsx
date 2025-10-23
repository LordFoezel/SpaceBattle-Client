import { BaseModal } from "../base/modal/BaseModal";
import { PasswordMatchLabel } from "../label/PasswordMatchLabel";
import { NameLabel } from "../label/NameLabel";
import { DescriptionLabel } from "../label/DescriptionLabel";
import { TransparentCard } from "../layout/TransparentCard";
import { useState } from "react";
import { BaseSeparator } from "../base/text/BaseSeparator";
import { PlayerCountLabel } from "../label/PlayerCountLabel";
import { MapSizeXLabel } from "../label/MapSizeXLabel";
import { MapSizeYLabel } from "../label/MapSizeYLabel";
import { createOne as createMatch } from "../../repositories/matches";
import { createOne as createConfigMatch } from "../../repositories/config_match";
import type { Match, MatchCreate as MatchCreateType } from "../../models/match"
import { MatchState } from "../../models/match"
import type { ConfigMatch, ConfigMatchCreate } from "../../models/config_match";
import { ErrorHelper } from "../../helper/errorHelper";
import { AuthTokenHelper } from "../../helper/authToken.js";

interface Props {
    onCreated?: () => void;
}

const CreateMatchModal = function CreateMatchModal({
    onCreated,
}: Props) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [playerCount, setPlayerCount] = useState(2);
    const [mapSizeX, setMapSizeX] = useState(10);
    const [mapSizeY, setMapSizeY] = useState(10);

    const disabled = !description || !name || playerCount < 1 || !mapSizeX || !mapSizeY;

    function onConfirm() {
        CreateMatch();
    }

    function onClose() {
        clearFields();
    }

    async function CreateMatch() {
        try {
            const { id: userId } = AuthTokenHelper.getUserIdentity();
            const newMatch: MatchCreateType = {
                name,
                state: MatchState.LOBBY,
                password_hash: password,
                created_by: userId,
                description,
            };
            const match = await createMatch(newMatch);

            try {
                const newMatchConfig: ConfigMatchCreate = {
                    match_id: match.id,
                    dimension_x: mapSizeX,
                    dimension_y: mapSizeY,
                    player_count: playerCount,
                    turn_timeout: (playerCount - 1) * 30,
                    fleet_config_id: null,
                };
                await createConfigMatch(newMatchConfig);
                clearFields();
            } catch (error) {
                ErrorHelper.handleError(error);
            }
        } catch (error) {
            ErrorHelper.handleError(error);
        }
    }

    function clearFields() {
        setName("");
        setDescription("");
        setPassword("");
        setPlayerCount(2);
        setMapSizeX(10);
        setMapSizeY(10);
    }

    return (
        <BaseModal buttonText={globalThis.t("lobby.createMatch")} title={globalThis.t("lobby.createMatch")} placement="top" onClose={onClose} onConfirm={onConfirm} disabledSave={disabled}>
            <TransparentCard direction="col" gap="2">
                <NameLabel value={name} onChange={(e) => setName(e.target.value)} />
                <DescriptionLabel value={description} onChange={(e) => setDescription(e.target.value)} />
                <PasswordMatchLabel value={password} onChange={(e) => setPassword(e.target.value)} />
                <BaseSeparator />
                <PlayerCountLabel value={playerCount} onChange={(e) => setPlayerCount(Number(e.target.value))} />
                <TransparentCard direction="row" gap="2">
                    <MapSizeXLabel value={mapSizeX} onChange={(e) => setMapSizeX(Number(e.target.value))} />
                    <MapSizeYLabel value={mapSizeY} onChange={(e) => setMapSizeY(Number(e.target.value))} />
                </TransparentCard>
            </TransparentCard>
        </BaseModal>
    );
};

export { CreateMatchModal };
