import { RPCRequest } from "../../provider/types/jsonrpc.mjs";
import { AxiosRequestConfig } from "axios";

//#region src/services/rest/restService.types.d.ts
interface RequestParams {
  request: RPCRequest;
  config?: AxiosRequestConfig;
}
//#endregion
export { RequestParams };
//# sourceMappingURL=restService.types.d.mts.map