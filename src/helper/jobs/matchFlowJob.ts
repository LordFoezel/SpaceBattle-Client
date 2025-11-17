import { CreateJobHelper, CheckJobHelper } from "./base.js";

const JOB_TYPE = "match_flow_job";

const buildJobKey = (matchId: number | string) => `${JOB_TYPE}:${matchId}`;

export class CreateMatchFlowJob extends CreateJobHelper {
  constructor(matchId: number, extraPayload?: Record<string, unknown>) {
    const payload = { match_id: matchId, ...(extraPayload ?? {}) };
    super(JOB_TYPE, { payload, jobKey: buildJobKey(matchId) });
  }
}

export class CheckMatchFlowJob extends CheckJobHelper {
  constructor(matchId?: number) {
    const where = matchId != null ? { job_key: buildJobKey(matchId) } : undefined;
    super(JOB_TYPE, { where });
  }
}
