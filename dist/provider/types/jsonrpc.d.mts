//#region src/provider/types/jsonrpc.d.ts
/**
 * The base JSON-RPC 2.0 request
 */
interface RPCRequest {
  jsonrpc: string;
  id: string | number;
  method: string;
  params?: unknown[];
}
/**
 * The base JSON-RPC 2.0 response
 */
interface RPCResponse<Result> {
  jsonrpc: string;
  id: string | number;
  result?: Result;
  error?: RPCError;
}
/**
 * The base JSON-RPC 2.0 typed response error
 */
interface RPCError {
  code: number;
  message: string;
  data?: unknown;
}
//#endregion
export { RPCError, RPCRequest, RPCResponse };
//# sourceMappingURL=jsonrpc.d.mts.map