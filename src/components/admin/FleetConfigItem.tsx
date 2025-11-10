import { useEffect, useState, type ChangeEvent, type FocusEvent } from "react";
import { BaseText } from "../base/text/BaseText";
import { BaseButtonDelete } from "../base/button/BaseButtonDelete";
import type { ConfigFleet } from "../../models/config_fleet";
import { BaseCard } from "../base/layout/BaseCard";
import { TransparentCard } from "../layout/TransparentCard";
import { BaseEditModal } from "../base/modal/BaseEditModal";
import { NameLabel } from "../label/NameLabel";

interface ItemProps {
  configFleet: ConfigFleet;
  handleDelete: (id: number) => void;
  handleUpdate: (update: { id: number;[key: string]: any }) => void;
}

const FleetConfigItem = function FleetConfigItem({
  configFleet,
  handleDelete,
  handleUpdate,
}: ItemProps) {

  function onChangeName(e: any) {
    configFleet.name = e.target.value;
    handleUpdate({ id: configFleet.id, name: e.target.value })
  }

  return (
    <BaseCard
      key={configFleet.id}
      variant="medium"
      padding="0"
      margin="0"
      direction="row"
      items="start"
      justify="between"
      gap="3"
    >
      <TransparentCard direction="row" justify="between">
        <BaseText fontWeight="semibold" >{configFleet.name}</BaseText>
        <TransparentCard direction="row" justify="end gap-2">
          <BaseEditModal
            title={`${globalThis.t("core.edit")}`}
            showSave={false}
          >
            <TransparentCard direction="col" gap="3">
              <NameLabel value={configFleet.name} onChange={onChangeName} />
            </TransparentCard>
          </BaseEditModal>
          <BaseButtonDelete
            width="10"
            id={configFleet.id}
            onClick={handleDelete}
          />
        </TransparentCard>
      </TransparentCard>
    </BaseCard>
  );
};

export { FleetConfigItem };
