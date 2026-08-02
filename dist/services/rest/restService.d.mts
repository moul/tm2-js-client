import { RequestParams } from "./restService.types.mjs";

//#region src/services/rest/restService.d.ts
declare class RestService {
  static post<TResult>(baseURL: string, params: RequestParams): Promise<TResult>;
}
//#endregion
export { RestService };
//# sourceMappingURL=restService.d.mts.map