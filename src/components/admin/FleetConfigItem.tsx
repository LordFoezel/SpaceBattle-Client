import { BaseText } from "../base/text/BaseText";
import { BaseButtonDelete } from "../base/button/BaseButtonDelete";
import type { ConfigFleet } from "../../models/config_fleet";
import { BaseCard } from "../base/layout/BaseCard";
import { TransparentCard } from "../layout/TransparentCard";
import { BaseButtonAdd } from "../base/button/BaseButtonAdd";


interface ItemProps {
    configFleet: ConfigFleet;
    handleDelete: (id: number) => void;
}

const FleetConfigItem = function FleetConfigItem({
    configFleet,
    handleDelete,
}: ItemProps) {

    return (
        <BaseCard
            key={configFleet.id}
            variant="medium"
            padding="2"
        >
            <TransparentCard className="flex items-start justify-between gap-3">
                <BaseText fontWeight="semibold">{configFleet.name}</BaseText>
                <BaseButtonDelete
                width="10"
                    id={configFleet.id}
                    onClick={handleDelete}
                />
            </TransparentCard>
        </BaseCard>
    );
};

export { FleetConfigItem };
