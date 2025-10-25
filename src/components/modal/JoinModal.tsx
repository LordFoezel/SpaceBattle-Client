import { BaseModal } from "../base/modal/BaseModal";
import { TransparentCard } from "../layout/TransparentCard";
import { useState } from "react";
import { PasswordLabel } from "../label/PasswordLabel";
import { fetchById as fetchMatchById } from "../../repositories/matches";
import { ErrorHelper } from "../../helper/errorHelper";

interface JoinModalProps {
    matchId: number;
    onChange?: (e: any) => any;
}

const JoinModal = function JoinModal(props: JoinModalProps) {
    const {
        matchId,
        onChange,
    } = props;

    const [password, setPassword] = useState("");

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

                // todo: if pasword is correckt and has space create player with id from localstorage ant the match then rout to /match/[matchid] -> create the route and page in client
            } catch (error) {
                ErrorHelper.handleError(error);
            }
        })();
    }

    return (
        <BaseModal buttonText={globalThis.t("lobby.join")} title={globalThis.t("lobby.join")} placement="top" onClose={onClose} onConfirm={onConfirm} confirmText={globalThis.t("lobby.join")}>
            <TransparentCard direction="col" gap="2">
                <PasswordLabel value={password} onChange={(e) => setPassword(e.target.value)} />
            </TransparentCard>
        </BaseModal>
    );
};

export { JoinModal };
