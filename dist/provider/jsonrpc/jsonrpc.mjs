import { BaseTm2Provider } from "../provider.mjs";
import { Tm2Client } from "@gnolang/tm2-rpc";
//#region src/provider/jsonrpc/jsonrpc.ts
/**
* Provider based on JSON-RPC HTTP requests
*/
var JSONRPCProvider = class JSONRPCProvider extends BaseTm2Provider {
	/**
	* Creates a new instance of the JSON-RPC Provider
	* @param {string} baseURL the JSON-RPC URL of the node
	*/
	static async create(baseURL) {
		return new JSONRPCProvider(await Tm2Client.connect(baseURL));
	}
};
//#endregion
export { JSONRPCProvider };

//# sourceMappingURL=jsonrpc.mjs.map