import { BaseText } from "../base/text/BaseText";
import { BaseButtonDelete } from "../base/button/BaseButtonDelete";
import type { ConfigFleet } from "../../models/config_fleet";
import { BaseCard } from "../base/layout/BaseCard";
import { TransparentCard } from "../layout/TransparentCard";
import { BaseEditModal } from "../base/modal/BaseEditModal";

interface ItemProps {
    configFleet: ConfigFleet;
    handleDelete: (id: number) => void;
}

const FleetConfigItem = function FleetConfigItem({
    configFleet,
    handleDelete,
}: ItemProps) {

    const editLabel = globalThis.t?.("core.edit") ?? "Edit";
    const createdAtText = configFleet.created_at
        ? configFleet.created_at.toLocaleString()
        : "";

    return (
        <BaseCard
            key={configFleet.id}
            variant="medium"
            padding="2"
            direction="row"
            items="start"
            justify="between"
            gap="3"
        >
            <TransparentCard className="flex flex-col gap-2">
                <BaseText fontWeight="semibold">{configFleet.name}</BaseText>
                {createdAtText && (
                    <BaseText fontSize="sm" color="gray-400">
                        {`${globalThis.t?.("fleets.createdAt") ?? "Created"}: ${createdAtText}`}
                    </BaseText>
                )}
            </TransparentCard>
            <div className="flex items-start gap-2">
                <BaseEditModal
                    title={`${editLabel} ${configFleet.name}`}
                    PageTitle={createdAtText}
                    showSave={false}
                >
                    <TransparentCard direction="col" gap="2">
                        {createdAtText && (
                            <BaseText fontSize="sm" color="gray-300">
                                {`${globalThis.t?.("fleets.createdAt") ?? "Created"}: ${createdAtText}`}
                            </BaseText>
                        )}
                    </TransparentCard>
                </BaseEditModal>
                <BaseButtonDelete
                    width="10"
                    id={configFleet.id}
                    onClick={handleDelete}
                />
            </div>
        </BaseCard>
    );
};

export { FleetConfigItem };
