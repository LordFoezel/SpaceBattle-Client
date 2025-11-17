import {
  fetchAll as fetchAllBase,
  fetchOne as fetchOneBase,
  fetchById as fetchByIdBase,
  createOne as createOneBase,
  deleteOne as deleteOneBase,
} from "./base.js";
import type { QueryInterface } from "../models/queryInterface.js";
import type { Job, JobCreate } from "../models/job.js";
import { adaptJob } from "../models/job.js";

const path = "/jobs";

export async function fetchAll(query: QueryInterface = {}): Promise<Job[]> {
  const data = await fetchAllBase(path, { query });
  return data.map(adaptJob);
}

export async function fetchOne(query: QueryInterface = {}): Promise<Job | null> {
  const entity = await fetchOneBase(path, { query });
  return entity ? adaptJob(entity) : null;
}

export async function fetchById(id: number): Promise<Job | null> {
  const entity = await fetchByIdBase(path, id);
  return entity ? adaptJob(entity) : null;
}

export async function createOne(payload: JobCreate): Promise<Job> {
  const entity = await createOneBase(path, payload);
  return adaptJob(entity);
}

export async function deleteOne(id: number): Promise<void> {
  await deleteOneBase(path, id);
}
