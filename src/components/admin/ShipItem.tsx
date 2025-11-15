import { BaseText } from "../base/text/BaseText";
import { BaseButtonDelete } from "../base/button/BaseButtonDelete";
import type { Ship } from "../../models/ship";
import { BaseCard } from "../base/layout/BaseCard";
import { TransparentCard } from "../layout/TransparentCard";
import { BaseEditModal } from "../base/modal/BaseEditModal";
import { NameLabel } from "../label/NameLabel";
import { DimensionLabel } from "../label/DimensionLabel";
import { IconTagLabel } from "../label/IconTagLabel";
import { BaseSpacer } from "../base/layout/BaseSpacer";

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
        handleUpdate({ id: ship.id, name: e.target.value })
    }
    function onChangeDimension(e: any) {
        handleUpdate({ id: ship.id, dimension: Number(e.target.value) })
    }
    function onChangeIconTag(e: any) {
        handleUpdate({ id: ship.id, iconTag: e.target.value })
    }

    return (
        <BaseCard
            key={ship.id}
            variant="medium"
            padding="0"
            margin="0"
            direction="row"
            items="start"
            justify="between"
            gap="3"
        >
            <TransparentCard direction="row" justify="between">
                <BaseSpacer width="2"/>
                <BaseText fontWeight="semibold">{ship.name}</BaseText>
                <TransparentCard direction="row" justify="end" gap="2">
                    <BaseEditModal
                        title={`${globalThis.t("core.edit")}`}
                        showSave={false}
                    >
                        <TransparentCard direction="col" gap="3">
                            <NameLabel value={ship.name} onChange={onChangeName} />
                            <DimensionLabel value={ship.dimension} onChange={onChangeDimension} />
                            <IconTagLabel value={ship.icon_tag} onChange={onChangeIconTag} />
                        </TransparentCard>
                    </BaseEditModal>
                    <BaseButtonDelete
                        width="10"
                        id={ship.id}
                        onClick={handleDelete}
                    />
                </TransparentCard>
            </TransparentCard>
        </BaseCard>
    );
};

export { ShipItem };
