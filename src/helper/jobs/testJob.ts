import { CreateJobHelper, CheckJobHelper } from "./base.js";

const JOB_TYPE = "test_job";

export class CreateTestJob extends CreateJobHelper {
  constructor(payload?: Record<string, unknown>) {
    super(JOB_TYPE, { payload });
  }
}

export class CheckTestJob extends CheckJobHelper {
  constructor() {
    super(JOB_TYPE);
  }
}
