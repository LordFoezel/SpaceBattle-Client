import { CreateJobHelper, CheckJobHelper } from "./base.js";

const JOB_TYPE = "test_job";

export class CreateTestJob extends CreateJobHelper {
  constructor(payload?: Record<string, unknown>, jobKey?: string) {
    super(JOB_TYPE, { payload, jobKey });
  }
}

export class CheckTestJob extends CheckJobHelper {
  constructor(jobKey?: string) {
    super(JOB_TYPE, { where: jobKey ? { job_key: jobKey } : undefined });
  }
}
