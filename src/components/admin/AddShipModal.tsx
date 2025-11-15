import { useState } from "react";

import { BaseModal } from "../base/modal/BaseModal";
import { TransparentCard } from "../layout/TransparentCard";
import { NameLabel } from "../label/NameLabel";
import { DimensionLabel } from "../label/DimensionLabel";
import { IconTagLabel } from "../label/IconTagLabel";
import { IconPlus } from "../icon/IconPlus";
import { ErrorHelper } from "../../helper/errorHelper.js";
import { createOne as createShip } from "../../repositories/ships";

interface AddShipModalProps {
  onCreated?: () => void;
}

const AddShipModal = function AddShipModal({ onCreated }: AddShipModalProps) {
  const [name, setName] = useState("");
  const [dimension, setDimension] = useState(1);
  const [iconTag, setIconTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setName("");
    setDimension(1);
    setIconTag("");
    setIsSubmitting(false);
  }

  function handleDimensionChange(event: any) {
    const next = Number(event?.target?.valueAsNumber ?? event?.target?.value ?? 1);
    const safeValue = Number.isFinite(next) && next > 0 ? Math.round(next) : 1;
    setDimension(safeValue);
  }

  async function handleConfirm() {
    const trimmedName = name.trim();
    const trimmedIcon = iconTag.trim();
    if (!trimmedName || !trimmedIcon || dimension < 1 || isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      await createShip({
        name: trimmedName,
        dimension,
        icon_tag: trimmedIcon,
      });
      onCreated?.();
      resetForm();
    } catch (error) {
      ErrorHelper.handleError(error);
      setIsSubmitting(false);
    }
  }

  const addLabel = globalThis.t?.("core.add") ?? "Add";
  const title = globalThis.t?.("ships.add") ?? "Add ship";
  const confirmLabel = globalThis.t?.("core.create") ?? "Create";
  const disabledSave = isSubmitting || !name.trim() || !iconTag.trim() || dimension < 1;

  return (
    <BaseModal
      title={title}
      placement="top"
      buttonText={addLabel}
      confirmText={confirmLabel}
      onConfirm={handleConfirm}
      onClose={resetForm}
      disabledSave={disabledSave}
      triggerChildren={<IconPlus />}
      triggerProps={{
        name: "add",
        size: "sm",
        colorScheme: "blue",
        width: "10",
        "aria-label": addLabel,
      }}
    >
      <TransparentCard direction="col" gap="3">
        <NameLabel value={name} onChange={(event) => setName(event.target.value)} />
        <DimensionLabel value={dimension} onChange={handleDimensionChange} />
        <IconTagLabel value={iconTag} onChange={(event) => setIconTag(event.target.value)} />
      </TransparentCard>
    </BaseModal>
  );
};

export { AddShipModal };
