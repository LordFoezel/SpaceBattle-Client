export type JobState = "pending" | "running" | "done" | "failed";

export interface Job {
  id: number;
  job_type: string;
  payload: Record<string, unknown>;
  run_at: Date;
  state: JobState;
  last_error?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface JobCreate {
  job_type: string;
  payload?: Record<string, unknown>;
  run_at?: Date;
  state?: JobState;
}

export interface JobUpdate {
  payload?: Record<string, unknown> | null;
  run_at?: Date | null;
  state?: JobState | null;
  last_error?: string | null;
}

export function adaptJob(raw: any): Job {
  return {
    id: raw.id,
    job_type: raw.job_type,
    payload: raw.payload ?? {},
    run_at: new Date(raw.run_at),
    state: raw.state,
    last_error: raw.last_error ?? null,
    created_at: new Date(raw.created_at),
    updated_at: new Date(raw.updated_at),
  };
}
