import { BaseModal } from "../base/modal/BaseModal";
import { TransparentCard } from "../layout/TransparentCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordLabel } from "../label/PasswordLabel";
import { fetchById as fetchMatchById } from "../../repositories/matches";
import { createOne as createPlayer } from "../../repositories/players";
import { ErrorHelper } from "../../helper/errorHelper";

interface JoinModalProps {
    matchId: number;
    disabledSave?: boolean;
    onChange?: (e: any) => any;
}

const JoinModal = function JoinModal(props: JoinModalProps) {
    const {
        matchId,
        onChange,
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
                if (match.password_hash && match.password_hash !== password) {
                    globalThis.notify.warning(globalThis.t("error.code.INVALID_CREDENTIALS"));
                    return;
                }

                const maxPlayers = match.config?.player_count ?? 0;
                const currentPlayers = match.current_player_count ?? 0;
                if (maxPlayers > 0 && currentPlayers >= maxPlayers) {
                    globalThis.notify.warning(globalThis.t("error.code.MATCH_FULL") ?? globalThis.t("core.full"));
                    return;
                }

                let userId: number | null = null;
                try {
                    const rawUser = window.localStorage.getItem("spacebattle.user");
                    if (rawUser) {
                        const parsed = JSON.parse(rawUser);
                        const parsedId = Number(parsed?.id ?? parsed?.user_id);
                        if (Number.isFinite(parsedId)) {
                            userId = parsedId;
                        }
                    }
                } catch {
                    /* ignore storage errors */
                }

                if (!userId) {
                    globalThis.notify.error(globalThis.t("error.notProvided", [globalThis.t("core.user")]));
                    return;
                }

                await createPlayer({
                    user_id: userId,
                    match_id: match.id,
                });

                onChange?.(match.id);
                setPassword("");
                navigate(`/match/${match.id}`, { replace: true });
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
