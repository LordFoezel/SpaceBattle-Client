import {
  fetchAll as fetchAllBase,
  fetchOne as fetchOneBase,
  updateOne as updateOneBase,
  deleteOne as deleteOneBase,
  fetchById as fetchByIdBase,
  createOne as createOneBase,
} from "./base.js";
import { adaptFleet, type FleetCreate, type FleetUpdate } from "../models/fleet.js";
import type { QueryInterface } from "../models/queryInterface.js";

const path = "/fleet";

export async function fetchAll(query: QueryInterface = {}) {
  const data = await fetchAllBase(path, { query });
  return data.map(adaptFleet);
}

export async function fetchOne(query: QueryInterface = {}) {
  const entity = await fetchOneBase(path, { query });
  return entity ? adaptFleet(entity) : null;
}

export async function fetchById(id: number) {
  const entity = await fetchByIdBase(path, id);
  return entity ? adaptFleet(entity) : null;
}

export async function createOne(payload: FleetCreate) {
  const entity = await createOneBase(path, payload);
  return adaptFleet(entity);
}

export async function updateOne(id: number, payload: FleetUpdate) {
  const entity = await updateOneBase(path, id, payload);
  return adaptFleet(entity);
}

export async function deleteOne(id: number) {
  await deleteOneBase(path, id);
}
