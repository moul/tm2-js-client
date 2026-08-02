import { BaseTm2Provider } from "../provider.mjs";

//#region src/provider/websocket/ws.d.ts
/**
 * Provider based on WS JSON-RPC requests
 */
declare class WSProvider extends BaseTm2Provider {
  /**
   * Creates a new instance of the {@link WSProvider}
   * @param {string} baseURL the WS URL of the node
   */
  static create(baseURL: string): Promise<WSProvider>;
  /**
   * Closes the WS connection. Required when done working
   * with the WS provider
   */
  closeConnection(): void;
}
//#endregion
export { WSProvider };
//# sourceMappingURL=ws.d.mts.map