import type { Job, JobCreate, JobState } from "../../models/job.js";
import type { QueryInterface, QueryWhere } from "../../models/queryInterface.js";
import * as JobRepository from "../../repositories/jobs.js";

type JobRepositoryContract = Pick<typeof JobRepository, "createOne" | "fetchOne" | "deleteOne">;

interface BaseJobHelperOptions {
  repository?: JobRepositoryContract;
}

export abstract class BaseJobHelper {
  protected readonly repository: JobRepositoryContract;
  protected readonly jobType: string;

  protected constructor(jobType: string, opts: BaseJobHelperOptions = {}) {
    if (!jobType) throw new Error("jobType is required");
    this.jobType = jobType;
    this.repository = opts.repository ?? JobRepository;
  }

  protected buildWhere(extra?: QueryWhere): QueryWhere {
    return { job_type: this.jobType, ...(extra ?? {}) };
  }

  protected buildQuery(extra?: QueryWhere): QueryInterface {
    return { where: this.buildWhere(extra) };
  }
}

interface CreateJobHelperOptions extends BaseJobHelperOptions {
  payload?: Record<string, unknown>;
  state?: JobState;
}

export abstract class CreateJobHelper extends BaseJobHelper {
  private readonly payload: Record<string, unknown>;
  private readonly runAt: Date;
  private readonly state?: JobState;

  protected constructor(jobType: string, opts: CreateJobHelperOptions = {}) {
    const { repository, payload, state } = opts;
    super(jobType, { repository });
    this.payload = payload ?? {};
    this.runAt = new Date();
    this.state = state;
  }

  async execute(): Promise<Job> {
    const jobPayload: JobCreate = {
      job_type: this.jobType,
      payload: this.payload,
      run_at: this.runAt,
    };
    if (this.state) jobPayload.state = this.state;
    return this.repository.createOne(jobPayload);
  }
}

interface CheckJobHelperOptions extends BaseJobHelperOptions {
  where?: QueryWhere;
}

export abstract class CheckJobHelper extends BaseJobHelper {
  protected readonly where?: QueryWhere;

  protected constructor(jobType: string, opts: CheckJobHelperOptions = {}) {
    const { repository, where } = opts;
    super(jobType, { repository });
    this.where = where;
  }

  async execute(): Promise<Job | null> {
    return this.repository.fetchOne(this.buildQuery(this.where));
  }
}

interface RemoveJobHelperOptions extends CheckJobHelperOptions {}

export abstract class RemoveJobHelper extends CheckJobHelper {
  protected constructor(jobType: string, opts: RemoveJobHelperOptions = {}) {
    super(jobType, opts);
  }

  async execute(): Promise<boolean> {
    const job = await super.execute();
    if (!job) return false;
    await this.repository.deleteOne(job.id);
    return true;
  }
}
