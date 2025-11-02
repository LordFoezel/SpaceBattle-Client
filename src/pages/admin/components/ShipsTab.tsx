import { useEffect, useState } from "react";
import { BaseText } from "../../../components/base/text/BaseText";
import type { Ship } from "../../../models/ship";
import { fetchAll as fetchAllShips } from "../../../repositories/ships";
import { ErrorHelper } from "../../../helper/errorHelper.js";

const ShipsTab = function ShipsTab() {
  const [ships, setShips] = useState<Ship[]>([]);

  useEffect(() => {
    void loadShips();
  }, []);

  async function loadShips() {
    try {
      const data = await fetchAllShips({});
      setShips(data);
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
          <BaseText fontWeight="semibold">{ship.name}</BaseText>
          <BaseText fontSize="sm" color="gray-400">
            {`${globalThis.t?.("match.dimension")}: ${ship.dimension}`}
          </BaseText>
        </div>
      ))}
    </div>
  );
};

export { ShipsTab };
