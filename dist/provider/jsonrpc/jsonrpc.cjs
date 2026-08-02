require("../../_virtual/_rolldown/runtime.cjs");
const require_provider = require("../provider.cjs");
let _gnolang_tm2_rpc = require("@gnolang/tm2-rpc");
//#region src/provider/jsonrpc/jsonrpc.ts
/**
* Provider based on JSON-RPC HTTP requests
*/
var JSONRPCProvider = class JSONRPCProvider extends require_provider.BaseTm2Provider {
	/**
	* Creates a new instance of the JSON-RPC Provider
	* @param {string} baseURL the JSON-RPC URL of the node
	*/
	static async create(baseURL) {
		return new JSONRPCProvider(await _gnolang_tm2_rpc.Tm2Client.connect(baseURL));
	}
};
//#endregion
exports.JSONRPCProvider = JSONRPCProvider;

//# sourceMappingURL=jsonrpc.cjs.map