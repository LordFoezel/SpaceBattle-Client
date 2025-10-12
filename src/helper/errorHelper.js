export class ErrorHelper {
  static async handleError(error) {
    const code = error?.payload?.code || `${error?.status}`;
    globalThis.notify?.warning(globalThis.t?.(`error.code.${code}`) ?? `Error: ${code}`);
    return code;
  }
}

