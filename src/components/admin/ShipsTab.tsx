import { useEffect, useState } from "react";
import { BaseText } from "../base/text/BaseText";
import { BaseButtonDelete } from "../base/button/BaseButtonDelete";
import type { Ship } from "../../models/ship";
import {
  fetchAll as fetchAllShips,
  deleteOne as deleteShip,
} from "../../repositories/ships";
import { ErrorHelper } from "../../helper/errorHelper.js";

const ShipsTab = function ShipsTab() {
  const [ships, setShips] = useState<Ship[]>([]);

  useEffect(() => {
    loadShips();
  }, []);

  async function loadShips() {
    try {
      const data = await fetchAllShips({});
      setShips(data);
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteShip(id);
      loadShips();
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }


  return (
    <div className="flex flex-col gap-3">
      {ships.map((ship, index) => (
        <div
          key={ship.id ?? index}
          className="rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-3 shadow-sm transition-colors hover:bg-slate-800/70"
        >
          <div className="flex items-start justify-between gap-3">
            <BaseText fontWeight="semibold">{ship.name}</BaseText>
            {ship.id != null && (
              <BaseButtonDelete
                id={ship.id}
                onClick={handleDelete}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export { ShipsTab };
