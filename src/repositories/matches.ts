import {
  fetchAll as fetchAllBase,
  fetchOne as fetchOneBase,
  updateOne as updateOneBase,
  deleteOne as deleteOneBase,
  fetchById as fetchByIdBase,
  createOne as createOneBase,
} from "./base.js";
import { adaptMatch, MatchCreate, MatchUpdate } from "../models/match.js";
import { QueryInterface } from "../models/queryInterface.js";

const path = "/matches";

export async function fetchAll(query: QueryInterface) {
  const data = await fetchAllBase(path, { query });
  return data.map(adaptMatch);
}

export async function fetchOne(query: QueryInterface) {
  const entity = await fetchOneBase(path, { query });
  return entity ? adaptMatch(entity) : null;
}

export async function fetchById(id: number) {
  const entity = await fetchByIdBase(path, id);
  return entity ? adaptMatch(entity) : null;
}

export async function createOne(payload: MatchCreate) {
  const entity = await createOneBase(path, payload);
  return adaptMatch(entity);
}

export async function updateOne(id: number, payload: MatchUpdate) {
  const entity = await updateOneBase(path, id, payload);
  return adaptMatch(entity);
}

export async function deleteOne(id: number) {
  await deleteOneBase(path, id);
}

