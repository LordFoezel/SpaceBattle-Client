import {
  fetchAll as fetchAllBase,
  fetchOne as fetchOneBase,
  updateOne as updateOneBase,
  deleteOne as deleteOneBase,
  fetchById as fetchByIdBase,
  createOne as createOneBase,
} from "./base.js";
import {
  adaptConfigFleetShip,
  type ConfigFleetShipCreate,
  type ConfigFleetShipUpdate,
} from "../models/config_fleet_ship.js";
import type { QueryInterface } from "../models/queryInterface.js";

const path = "/config-fleet-ship";

export async function fetchAll(query: QueryInterface = {}) {
  const data = await fetchAllBase(path, { query });
  return data.map(adaptConfigFleetShip);
}

export async function fetchOne(query: QueryInterface = {}) {
  const entity = await fetchOneBase(path, { query });
  return entity ? adaptConfigFleetShip(entity) : null;
}

export async function fetchById(id: number) {
  const entity = await fetchByIdBase(path, id);
  return entity ? adaptConfigFleetShip(entity) : null;
}

export async function createOne(payload: ConfigFleetShipCreate) {
  const entity = await createOneBase(path, payload);
  return adaptConfigFleetShip(entity);
}

export async function updateOne(id: number, payload: ConfigFleetShipUpdate) {
  const entity = await updateOneBase(path, id, payload);
  return adaptConfigFleetShip(entity);
}

export async function deleteOne(id: number) {
  await deleteOneBase(path, id);
}
