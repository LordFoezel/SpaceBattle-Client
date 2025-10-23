import { BaseModal } from "../base/modal/BaseModal";
import { TransparentCard } from "../layout/TransparentCard";
import { useState } from "react";
import { PasswordLabel } from "../label/PasswordLabel";

interface JoinModalProps {
    onChange?: (e: any) => any;
}

const JoinModal = function JoinModal(props: JoinModalProps) {
    const {
        onChange,
    } = props;

    const [password, setPassword] = useState("");

    function onClose() {
        setPassword("");
    }

    function onConfirm() {
        // todo: check if password ist correct -> if so -> join to lobby -> else reset password 
    }

    return (
        <BaseModal buttonText={globalThis.t("lobby.join")} title={globalThis.t("lobby.join")} placement="top" onClose={onClose} onConfirm={onConfirm}>
            <TransparentCard direction="col" gap="2">
                <PasswordLabel value={password} onChange={(e) => setPassword(e.target.value)} />
            </TransparentCard>
        </BaseModal>
    );
};

export { JoinModal };
