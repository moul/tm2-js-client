import { RPCRequest } from "../../provider/types/jsonrpc.cjs";
import { AxiosRequestConfig } from "axios";

//#region src/services/rest/restService.types.d.ts
interface RequestParams {
  request: RPCRequest;
  config?: AxiosRequestConfig;
}
//#endregion
export { RequestParams };
//# sourceMappingURL=restService.types.d.cts.map