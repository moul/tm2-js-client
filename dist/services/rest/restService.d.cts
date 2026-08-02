import { RequestParams } from "./restService.types.cjs";

//#region src/services/rest/restService.d.ts
declare class RestService {
  static post<TResult>(baseURL: string, params: RequestParams): Promise<TResult>;
}
//#endregion
export { RestService };
//# sourceMappingURL=restService.d.cts.map