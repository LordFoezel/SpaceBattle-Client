import { BaseText } from "../base/text/BaseText";
import { BaseButtonDelete } from "../base/button/BaseButtonDelete";
import type { Ship } from "../../models/ship";
import { BaseCard } from "../base/layout/BaseCard";
import { TransparentCard } from "../layout/TransparentCard";

interface ItemProps {
    ship: Ship;
    handleDelete: (id: number) => void;
}

const ShipItem = function ShipItem({
    ship,
    handleDelete,
}: ItemProps) {

    return (
        <BaseCard
            key={ship.id}
            variant="medium"
            padding="2"
        >
            <TransparentCard className="flex items-start justify-between gap-3">
                <BaseText fontWeight="semibold">{ship.name}</BaseText>
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
