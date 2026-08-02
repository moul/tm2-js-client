import { BaseTm2Provider } from "../provider.mjs";
import { Tm2Client } from "@gnolang/tm2-rpc";
//#region src/provider/websocket/ws.ts
/**
* Provider based on WS JSON-RPC requests
*/
var WSProvider = class WSProvider extends BaseTm2Provider {
	/**
	* Creates a new instance of the {@link WSProvider}
	* @param {string} baseURL the WS URL of the node
	*/
	static async create(baseURL) {
		return new WSProvider(await Tm2Client.connect(baseURL));
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
export { WSProvider };

//# sourceMappingURL=ws.mjs.map