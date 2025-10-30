import { BaseModal } from "../base/modal/BaseModal";
import { TransparentCard } from "../layout/TransparentCard";
import { PasswordMatchLabel } from "../label/PasswordMatchLabel";
import { DescriptionLabel } from "../label/DescriptionLabel";
import { NameLabel } from "../label/NameLabel";
import { PlayerCountLabel } from "../label/PlayerCountLabel";
import { MapSizeXLabel } from "../label/MapSizeXLabel";
import { MapSizeYLabel } from "../label/MapSizeYLabel";
import { useState, useEffect } from "react";
import { updateOne as updateOneConfig } from "../../repositories/config_match";
import { updateOne as updateOneMatch } from "../../repositories/matches";
import type { Match } from "../../models/match";
import { fetchShConfigFleet } from "../../repositories/select_option";
import { ErrorHelper } from "../../helper/errorHelper";
import { ConfigFleetLabel } from "../label/ConfigFleetLabel";

interface ModalProps {
    match: Match;
    onChange?: () => any;
}

const MatchConfigModal = function MatchConfigModal(props: ModalProps) {
    const {
        match,
        onChange,
    } = props;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [playerCount, setPlayerCount] = useState(2);
    const [mapSizeX, setMapSizeX] = useState(10);
    const [mapSizeY, setMapSizeY] = useState(10);
    const [configFleet, setConfigFleet] = useState(0);
    const [configFleetOptions, setConfigFleetOptions] = useState([]);

    useEffect(() => {
        if (!match) return;
        setName(match.name);
        setDescription(match.description);
        setPassword(match.password_hash);
        setPlayerCount(match.config?.player_count);
        setMapSizeX(match.config?.dimension_x);
        setMapSizeY(match.config?.dimension_y);
        setConfigFleet(match.config?.fleet_config_id);
        loadOption();
    }, [match]);

    async function onChangeConfig(tag: string, e: any) {
        const value = e.target.value;
        const fieldMap: Record<string, { type: "match" | "config"; key: string }> = {
            name: { type: "match", key: "name" },
            description: { type: "match", key: "description" },
            password: { type: "match", key: "password_hash" },
            playerCount: { type: "config", key: "player_count" },
            mapSizeX: { type: "config", key: "dimension_x" },
            mapSizeY: { type: "config", key: "dimension_y" },
            configFleet: { type: "config", key: "fleet_config_id" },
        };
        const target = fieldMap[tag];
        if (!target) return;
        if (target.type === "match") {
            await updateOneMatch(match.id, { [target.key]: value });
        } else {
            await updateOneConfig(match.config.id, { [target.key]: value });
        }
        onChange();
    }

    async function loadOption() {
        try {
            const options = await fetchShConfigFleet();
            setConfigFleetOptions(options);
        } catch (error) {
            ErrorHelper.handleError(error);
        }
    }
    return (
        <BaseModal buttonText={globalThis.t("match.config")} title={globalThis.t("match.config")} placement="top" showSave={false} showClose={false} >
            <TransparentCard direction="col" gap="2">
                <NameLabel value={name} onChange={(e) => setName(e.target.value)} onBlur={(e) => onChangeConfig('name', e)} />
                <DescriptionLabel value={description} onChange={(e) => setDescription(e.target.value)} onBlur={(e) => onChangeConfig('description', e)} />
                <PasswordMatchLabel value={password} onChange={(e) => setPassword(e.target.value)} onBlur={(e) => onChangeConfig('password', e)} />
                <PlayerCountLabel value={playerCount} onChange={(e) => setPlayerCount(Number(e.target.value))} onBlur={(e) => onChangeConfig('playerCount', e)} />
                <ConfigFleetLabel value={configFleet} onChange={(e) => onChangeConfig('configFleet', e)} options={configFleetOptions} />
                <TransparentCard direction="row" gap="2">
                    <MapSizeXLabel value={mapSizeX} onChange={(e) => setMapSizeX(Number(e.target.value))} onBlur={(e) => onChangeConfig('mapSizeX', e)} />
                    <MapSizeYLabel value={mapSizeY} onChange={(e) => setMapSizeY(Number(e.target.value))} onBlur={(e) => onChangeConfig('mapSizeY', e)} />
                </TransparentCard>
            </TransparentCard>
        </BaseModal>
    );
};

export { MatchConfigModal };
