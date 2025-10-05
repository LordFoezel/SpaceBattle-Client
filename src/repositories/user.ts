import {
  fetchAll as fetchAllBase,
  fetchOne as fetchOneBase,
  updateOne as updateOneBase,
  deleteOne as deleteOneBase,
  fetchById as fetchByIdBase,
  createOne as createOneBase
} from "./base.js";
import { adaptUser, UserCreate, UserUpdate } from "../models/user.js";
import { QueryInterface } from "../models/queryInterface.js";


const path = '/users';

export async function fetchAll(query: QueryInterface) {
  const data = await fetchAllBase(path, { query });
  return data.map(adaptUser);
}

export async function fetchOne(query: QueryInterface) {
  const user = await fetchOneBase(path, { query });
  return user ? adaptUser(user) : null;
}

export async function fetchById(id:string) {
  const user = await fetchByIdBase(path, id);
  return user ? adaptUser(user) : null;
}

export async function createOne(payload: UserCreate) {
  const user = await createOneBase(path, payload)
  return adaptUser(user);
}

export async function updateOne(id: string, payload: UserUpdate) {
  const user = await updateOneBase(path, id, payload);
  return adaptUser(user);
}

export async function deleteOne(id: string) {
  await deleteOneBase(path, id);
}

export async function login(email: string, password: string) {
  const query = {
    email: email,
    password: password
  };
  const user = await fetchOneBase(path, { query });
  return user ? adaptUser(user) : null;
}

export async function register(payload: UserCreate) {
  const user = await createOneBase(path, payload);
  return user ? adaptUser(user) : null;
}
