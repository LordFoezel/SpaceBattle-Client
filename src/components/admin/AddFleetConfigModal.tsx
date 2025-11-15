import { useEffect, useState } from "react";

import { BaseModal } from "../base/modal/BaseModal";
import { TransparentCard } from "../layout/TransparentCard";
import { NameLabel } from "../label/NameLabel";
import { BaseText } from "../base/text/BaseText";
import { BaseInputNumber } from "../base/input/BaseInputNumber";
import { IconPlus } from "../icon/IconPlus";
import { ErrorHelper } from "../../helper/errorHelper.js";
import { createOne as createConfigFleet } from "../../repositories/config_fleet";
import { createOne as createConfigFleetShip } from "../../repositories/config_fleet_ship";
import { fetchAll as fetchAllShips } from "../../repositories/ships";
import type { Ship } from "../../models/ship";

interface AddFleetConfigModalProps {
  onCreated?: () => void;
}

const AddFleetConfigModal = function AddFleetConfigModal({
  onCreated,
}: AddFleetConfigModalProps) {
  const [name, setName] = useState("");
  const [ships, setShips] = useState<Ship[]>([]);
  const [shipCounts, setShipCounts] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadShips();
  }, []);

  function buildInitialCounts(list: Ship[]): Record<number, number> {
    return list.reduce<Record<number, number>>((acc, ship) => {
      acc[ship.id] = 0;
      return acc;
    }, {});
  }

  async function loadShips() {
    try {
      const data = await fetchAllShips({});
      setShips(data);
      setShipCounts(buildInitialCounts(data));
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  function resetForm() {
    setName("");
    setShipCounts(buildInitialCounts(ships));
    setIsSubmitting(false);
  }

  function handleCountChange(shipId: number) {
    return (event: any) => {
      const value = Number(event.target.value ?? 0);
      const nextValue = Number.isNaN(value) ? 0 : Math.max(0, value);
      setShipCounts((prev) => ({
        ...prev,
        [shipId]: nextValue,
      }));
    };
  }

  async function handleConfirm() {
    const trimmedName = name.trim();
    if (!trimmedName || isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const createdConfig = await createConfigFleet({ name: trimmedName });
      const entries = Object.entries(shipCounts).filter(([, count]) => count > 0);
      if (entries.length > 0) {
        await Promise.all(
          entries.map(([shipId, count]) =>
            createConfigFleetShip({
              config_fleet_id: createdConfig.id,
              ship_id: Number(shipId),
              count,
            }),
          ),
        );
      }
      onCreated?.();
      resetForm();
    } catch (error) {
      ErrorHelper.handleError(error);
      setIsSubmitting(false);
    }
  }

  const addLabel = globalThis.t?.("core.add") ?? "Add";
  const title = globalThis.t?.("fleet.configs.add") ?? "Add fleet configuration";
  const confirmLabel = globalThis.t?.("core.create") ?? "Create";
  const disabledSave = isSubmitting || !name.trim();

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
        {ships.map((ship) => (
          <TransparentCard key={ship.id} direction="row" items="center" gap="2">
            <BaseText>{ship.name}</BaseText>
            <BaseInputNumber
              min={0}
              max={10}
              value={shipCounts[ship.id] ?? 0}
              onChange={handleCountChange(ship.id)}
            />
          </TransparentCard>
        ))}
      </TransparentCard>
    </BaseModal>
  );
};

export { AddFleetConfigModal };
