import { BaseModal } from "../base/modal/BaseModal";
import { TransparentCard } from "../layout/TransparentCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordLabel } from "../label/PasswordLabel";
import { fetchById as fetchMatchById } from "../../repositories/matches";
import { createOne as createPlayer } from "../../repositories/players";
import { ErrorHelper } from "../../helper/errorHelper";
import { AuthTokenHelper } from "../../helper/authToken.js";

interface ModalProps {
    matchId: number;
    onChange?: (e: any) => any;
}

const MatchConfigModal = function MatchConfigModal(props: ModalProps) {
    const {
        matchId,
        onChange,
    } = props;

    return (
        <BaseModal buttonText={globalThis.t("match.config")} title={globalThis.t("match.config")} placement="top" showSave={false} >
            <TransparentCard direction="col" gap="2">
            </TransparentCard>
        </BaseModal>
    );
};

export { MatchConfigModal };
