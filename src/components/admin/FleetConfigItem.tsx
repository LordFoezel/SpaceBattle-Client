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
  handleUpdate: (update: { id: number; [key: string]: any }) => void;
}

const FleetConfigItem = function FleetConfigItem({
  configFleet,
  handleDelete,
  handleUpdate,
}: ItemProps) {
  const editLabel = globalThis.t?.("core.edit") ?? "Edit";
  const createdAtText = configFleet.created_at
    ? configFleet.created_at.toLocaleString()
    : "";

  const [nameValue, setNameValue] = useState(configFleet.name);

  useEffect(() => {
    setNameValue(configFleet.name);
  }, [configFleet.name]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameValue(event?.target?.value ?? "");
  };

  const handleNameBlur = (event: FocusEvent<HTMLInputElement>) => {
    const nextValue = event?.target?.value?.trim() ?? "";
    if (!nextValue || nextValue === configFleet.name) {
      setNameValue(configFleet.name);
      return;
    }

    setNameValue(nextValue);
    handleUpdate({ id: configFleet.id, name: nextValue });
  };

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
        <BaseText fontWeight="semibold">{nameValue}</BaseText>
        {createdAtText && (
          <BaseText fontSize="sm" color="gray-400">
            {`${globalThis.t?.("fleets.createdAt") ?? "Created"}: ${createdAtText}`}
          </BaseText>
        )}
      </TransparentCard>
      <div className="flex items-start gap-2">
        <BaseEditModal
          title={`${editLabel} ${nameValue}`}
          PageTitle={createdAtText}
          showSave={false}
        >
          <TransparentCard direction="col" gap="3">
            <NameLabel
              value={nameValue}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
            />
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
