require("../../_virtual/_rolldown/runtime.cjs");
const require_provider = require("../provider.cjs");
let _gnolang_tm2_rpc = require("@gnolang/tm2-rpc");
//#region src/provider/websocket/ws.ts
/**
* Provider based on WS JSON-RPC requests
*/
var WSProvider = class WSProvider extends require_provider.BaseTm2Provider {
	/**
	* Creates a new instance of the {@link WSProvider}
	* @param {string} baseURL the WS URL of the node
	*/
	static async create(baseURL) {
		return new WSProvider(await _gnolang_tm2_rpc.Tm2Client.connect(baseURL));
	}
	/**
	* Closes the WS connection. Required when done working
	* with the WS provider
	*/
	closeConnection() {
		this.client.disconnect();
	}
};
//#endregion
exports.WSProvider = WSProvider;

//# sourceMappingURL=ws.cjs.map