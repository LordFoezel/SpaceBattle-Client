import { useEffect, useState, type FocusEvent } from "react";
import { BaseText } from "../base/text/BaseText";
import { BaseButtonDelete } from "../base/button/BaseButtonDelete";
import type { ConfigFleet } from "../../models/config_fleet";
import { BaseCard } from "../base/layout/BaseCard";
import { TransparentCard } from "../layout/TransparentCard";
import { BaseEditModal } from "../base/modal/BaseEditModal";
import { NameLabel } from "../label/NameLabel";
import {
  fetchAll as fetchAllShips,
} from "../../repositories/ships";
import type { Ship } from "../../models/ship";
import { ErrorHelper } from "../../helper/errorHelper";
import { BaseInputNumber } from "../base/input/BaseInputNumber";
import {
  fetchAll as fetchAllConfigShips,
  updateOne,
  createOne,
} from "../../repositories/config_fleet_ship";
import { ConfigFleetShip } from "src/models/config_fleet_ship";

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

  const [ships, setShips] = useState<Ship[]>([]);
  const [shipConfigs, setShipConfigs] = useState<ConfigFleetShip[]>([]);

  function onChangeName(e: any) {
    configFleet.name = e.target.value;
    handleUpdate({ id: configFleet.id, name: e.target.value })
  }

  useEffect(() => {
    loadShips();
    loadShipConfigs();
  }, [configFleet]);

  async function loadShipConfigs() {
    try {
      const data = await fetchAllConfigShips({ config_fleet_id: configFleet.id });
      setShipConfigs(data);
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  async function loadShips() {
    try {
      const data = await fetchAllShips({});
      setShips(data);
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  function updateShip(shipId: number) {

    return async (event: FocusEvent<HTMLInputElement>) => {
      const count = Number(event.target.value ?? 0);
      const existing = shipConfigs.find((item) => item.ship_id === shipId);
      try {
        if (existing) {
          await updateOne(existing.id, { count });
          loadShipConfigs();
        } else {
          await createOne({
            config_fleet_id: configFleet.id,
            ship_id: shipId,
            count,
          });
          loadShipConfigs();
        }
      } catch (error) {
        ErrorHelper.handleError(error);
      }
    };
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
              {ships.map((ship) => {
                const count =
                  shipConfigs.find((item) => item.ship_id === ship.id)?.count ||
                  0;

                return (
                  <TransparentCard key={ship.id} direction="row">
                    <BaseText>{ship.name}</BaseText>
                    <BaseInputNumber
                      min={0}
                      max={10}
                      key={ship.id}
                      value={count}
                      onChange={updateShip(ship.id)}
                    />
                  </TransparentCard>
                );
              })}
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
