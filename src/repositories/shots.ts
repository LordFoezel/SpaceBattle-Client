import {
  fetchAll as fetchAllBase,
  fetchOne as fetchOneBase,
  fetchById as fetchByIdBase,
  createOne as createOneBase,
  updateOne as updateOneBase,
  deleteOne as deleteOneBase,
} from "./base.js";
import { adaptShot, type ShotCreate, type ShotUpdate } from "../models/shot.js";
import type { QueryInterface } from "../models/queryInterface.js";

const path = "/shots";

export async function fetchAll(query: QueryInterface = {}) {
  const data = await fetchAllBase(path, { query });
  return data.map(adaptShot);
}

export async function fetchOne(query: QueryInterface = {}) {
  const entity = await fetchOneBase(path, { query });
  return entity ? adaptShot(entity) : null;
}

export async function fetchById(id: number) {
  const entity = await fetchByIdBase(path, id);
  return entity ? adaptShot(entity) : null;
}

export async function createOne(payload: ShotCreate) {
  const entity = await createOneBase(path, payload);
  return adaptShot(entity);
}

export async function updateOne(id: number, payload: ShotUpdate) {
  const entity = await updateOneBase(path, id, payload);
  return adaptShot(entity);
}

export async function deleteOne(id: number) {
  await deleteOneBase(path, id);
}

