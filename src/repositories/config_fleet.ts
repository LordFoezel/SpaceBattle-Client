import {
  fetchAll as fetchAllBase,
  fetchOne as fetchOneBase,
  updateOne as updateOneBase,
  deleteOne as deleteOneBase,
  fetchById as fetchByIdBase,
  createOne as createOneBase,
} from "./base.js";
import { adaptConfigFleet, ConfigFleetCreate, ConfigFleetUpdate } from "../models/config_fleet.js";
import { QueryInterface } from "../models/queryInterface.js";

const path = "/config-fleet";

export async function fetchAll(query: QueryInterface) {
  const data = await fetchAllBase(path, { query });
  return data.map(adaptConfigFleet);
}

export async function fetchOne(query: QueryInterface) {
  const entity = await fetchOneBase(path, { query });
  return entity ? adaptConfigFleet(entity) : null;
}

export async function fetchById(id: number) {
  const entity = await fetchByIdBase(path, id);
  return entity ? adaptConfigFleet(entity) : null;
}

export async function createOne(payload: ConfigFleetCreate) {
  const entity = await createOneBase(path, payload);
  return adaptConfigFleet(entity);
}

export async function updateOne(id: number, payload: ConfigFleetUpdate) {
  const entity = await updateOneBase(path, id, payload);
  return adaptConfigFleet(entity);
}

export async function deleteOne(id: number) {
  await deleteOneBase(path, id);
}

