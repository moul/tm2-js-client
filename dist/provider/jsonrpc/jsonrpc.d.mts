import { BaseTm2Provider } from "../provider.mjs";

//#region src/provider/jsonrpc/jsonrpc.d.ts
/**
 * Provider based on JSON-RPC HTTP requests
 */
declare class JSONRPCProvider extends BaseTm2Provider {
  /**
   * Creates a new instance of the JSON-RPC Provider
   * @param {string} baseURL the JSON-RPC URL of the node
   */
  static create(baseURL: string): Promise<JSONRPCProvider>;
}
//#endregion
export { JSONRPCProvider };
//# sourceMappingURL=jsonrpc.d.mts.map