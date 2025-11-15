import {
  fetchAll as fetchAllBase,
  fetchOne as fetchOneBase,
  updateOne as updateOneBase,
  deleteOne as deleteOneBase,
  fetchById as fetchByIdBase,
  createOne as createOneBase,
} from "./base.js";
import { adaptShip, type ShipCreate, type ShipUpdate } from "../models/ship.js";
import type { QueryInterface } from "../models/queryInterface.js";

const path = "/ships";

function serializeShipPayload(payload: Record<string, any>) {
  if (!payload) return payload;
  const next = { ...payload };
  if ("iconTag" in next) {
    next.icon_tag = next.iconTag;
    delete next.iconTag;
  }
  return next;
}

export async function fetchAll(query: QueryInterface = {}) {
  const data = await fetchAllBase(path, { query });
  return data.map(adaptShip);
}

export async function fetchOne(query: QueryInterface = {}) {
  const entity = await fetchOneBase(path, { query });
  return entity ? adaptShip(entity) : null;
}

export async function fetchById(id: number) {
  const entity = await fetchByIdBase(path, id);
  return entity ? adaptShip(entity) : null;
}

export async function createOne(payload: ShipCreate) {
  const entity = await createOneBase(path, serializeShipPayload(payload));
  return adaptShip(entity);
}

export async function updateOne(id: number, payload: ShipUpdate) {
  const entity = await updateOneBase(path, id, serializeShipPayload(payload));
  return adaptShip(entity);
}

export async function deleteOne(id: number) {
  await deleteOneBase(path, id);
}
