import { useEffect, useState } from "react";
import type { Ship, ShipCreate } from "../../models/ship";
import {
  fetchAll,
  deleteOne,
  createOne,
} from "../../repositories/ships";
import { ErrorHelper } from "../../helper/errorHelper.js";
import { BaseButtonAdd } from "../base/button/BaseButtonAdd";
import { TransparentCard } from "../layout/TransparentCard";
import { ShipItem } from "./ShipItem";

const ShipsTab = function ShipsTab() {
  const [ships, setShips] = useState<Ship[]>([]);

  useEffect(() => {
    loadShips();
  }, []);

  async function loadShips() {
    try {
      const data = await fetchAll({});
      setShips(data);
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteOne(id);
      loadShips();
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  async function handleAdd() {
    try {
      const newItem: ShipCreate = { name: "tset", dimension: 1 }
      await createOne(newItem);
      loadShips();
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  return (
    <TransparentCard direction="col" gap="2">
      <BaseButtonAdd onClick={handleAdd} />
      <TransparentCard direction="col" gap="2">
        {ships.map((ship) => (
          <ShipItem ship={ship} handleDelete={handleDelete} key={ship.id} />
        ))}
      </TransparentCard>
    </TransparentCard>
  );
};

export { ShipsTab };
