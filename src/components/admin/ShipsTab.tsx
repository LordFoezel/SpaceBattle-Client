import { useEffect, useState } from "react";
import type { Ship } from "../../models/ship";
import {
  fetchAll,
  deleteOne,
  updateOne,
} from "../../repositories/ships";
import { ErrorHelper } from "../../helper/errorHelper.js";
import { TransparentCard } from "../layout/TransparentCard";
import { ShipItem } from "./ShipItem";
import { AddShipModal } from "./AddShipModal";

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

  async function handleUpdate(update: { id: number; [key: string]: any }) {
    const { id, ...payload } = update;
    try {
      await updateOne(id, payload);
      loadShips();
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  return (
    <TransparentCard direction="col" gap="2">
      <AddShipModal onCreated={loadShips} />
      <TransparentCard direction="col" gap="2">
        {ships.map((ship) => (
          <ShipItem
            ship={ship}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            key={ship.id}
          />
        ))}
      </TransparentCard>
    </TransparentCard>
  );
};

export { ShipsTab };
