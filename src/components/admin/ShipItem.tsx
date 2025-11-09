import { BaseText } from "../base/text/BaseText";
import { BaseButtonDelete } from "../base/button/BaseButtonDelete";
import type { Ship } from "../../models/ship";
import { BaseCard } from "../base/layout/BaseCard";
import { TransparentCard } from "../layout/TransparentCard";
import { BaseEditModal } from "../base/modal/BaseEditModal";
import { NameLabel } from "../label/NameLabel";
import { DimensionLabel } from "../label/DimensionLabel";

interface ItemProps {
    ship: Ship;
    handleDelete: (id: number) => void;
    handleUpdate: (update: { id: number;[key: string]: any }) => void;

}

const ShipItem = function ShipItem({
    ship,
    handleDelete,
    handleUpdate,
}: ItemProps) {

    function onChangeName(e: any) {
        ship.name = e.target.value;
        handleUpdate({ id: ship.id, name: e.target.value })
    }
    function onChangeDimension(e: any) {
        ship.name = e.target.value;
        handleUpdate({ id: ship.id, dimension: Number(e.target.value) })
    }

    return (
        <BaseCard
            key={ship.id}
            variant="medium"
            padding="2"
            direction="row"
            items="start"
            justify="between"
            gap="3"
        >
            <TransparentCard className="flex items-start justify-between gap-3" direction="col">
                <BaseText fontWeight="semibold">{ship.name}</BaseText>
                <BaseEditModal
                    title={`${globalThis.t("core.edit")}`}
                    PageTitle={`${globalThis.t?.("ships.dimension") ?? "Dimension"}: ${ship.dimension}`}
                    showSave={false}
                >
                    <TransparentCard direction="col" gap="3">
                        <NameLabel value={ship.name} onChange={onChangeName} />
                        <DimensionLabel value={ship.dimension} onChange={onChangeDimension} />
                    </TransparentCard>
                </BaseEditModal>
                <BaseButtonDelete
                    width="10"
                    id={ship.id}
                    onClick={handleDelete}
                />
            </TransparentCard>
        </BaseCard>
    );
};

export { ShipItem };
