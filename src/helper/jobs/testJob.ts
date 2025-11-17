import type { QueryWhere } from "../../models/queryInterface.js";
import { CreateJobHelper, CheckJobHelper, RemoveJobHelper } from "./base.js";

const JOB_TYPE = "test_job";

export class CreateTestJob extends CreateJobHelper {
  constructor(payload?: Record<string, unknown>) {
    super(JOB_TYPE, { payload });
  }
}

export class CheckTestJob extends CheckJobHelper {
  constructor(where?: QueryWhere) {
    super(JOB_TYPE, { where });
  }
}

export class RemoveTestJob extends RemoveJobHelper {
  constructor(where?: QueryWhere) {
    super(JOB_TYPE, { where });
  }
}
