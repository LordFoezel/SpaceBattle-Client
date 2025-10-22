import {
  fetchAll as fetchAllBase,
  fetchOne as fetchOneBase,
  updateOne as updateOneBase,
  deleteOne as deleteOneBase,
  fetchById as fetchByIdBase,
  createOne as createOneBase,
} from "./base.js";
import { adaptPlayer, PlayerCreate, PlayerUpdate } from "../models/player.js";
import { QueryInterface } from "../models/queryInterface.js";

const path = "/players";

export async function fetchAll(query: QueryInterface) {
  const data = await fetchAllBase(path, { query });
  return data.map(adaptPlayer);
}

export async function fetchOne(query: QueryInterface) {
  const entity = await fetchOneBase(path, { query });
  return entity ? adaptPlayer(entity) : null;
}

export async function fetchById(id: number) {
  const entity = await fetchByIdBase(path, id);
  return entity ? adaptPlayer(entity) : null;
}

export async function createOne(payload: PlayerCreate) {
  const entity = await createOneBase(path, payload);
  return adaptPlayer(entity);
}

export async function updateOne(id: number, payload: PlayerUpdate) {
  const entity = await updateOneBase(path, id, payload);
  return adaptPlayer(entity);
}

export async function deleteOne(id: number) {
  await deleteOneBase(path, id);
}

