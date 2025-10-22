import {
  fetchAll as fetchAllBase,
  fetchOne as fetchOneBase,
  updateOne as updateOneBase,
  deleteOne as deleteOneBase,
  fetchById as fetchByIdBase,
  createOne as createOneBase,
} from "./base.js";
import { adaptConfigMatch, ConfigMatchCreate, ConfigMatchUpdate } from "../models/config_match.js";
import { QueryInterface } from "../models/queryInterface.js";

const path = "/config-match";

export async function fetchAll(query: QueryInterface) {
  const data = await fetchAllBase(path, { query });
  return data.map(adaptConfigMatch);
}

export async function fetchOne(query: QueryInterface) {
  const entity = await fetchOneBase(path, { query });
  return entity ? adaptConfigMatch(entity) : null;
}

export async function fetchById(id: number) {
  const entity = await fetchByIdBase(path, id);
  return entity ? adaptConfigMatch(entity) : null;
}

export async function createOne(payload: ConfigMatchCreate) {
  const entity = await createOneBase(path, payload);
  return adaptConfigMatch(entity);
}

export async function updateOne(id: number, payload: ConfigMatchUpdate) {
  const entity = await updateOneBase(path, id, payload);
  return adaptConfigMatch(entity);
}

export async function deleteOne(id: number) {
  await deleteOneBase(path, id);
}

