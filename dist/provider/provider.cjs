const require_tx = require("../proto/tm2/tx.cjs");
require("../proto/index.cjs");
const require_endpoints = require("./endpoints.cjs");
const require_defineProperty = require("../_virtual/_@oxc-project_runtime@0.122.0/helpers/defineProperty.cjs");
const require_abci = require("./types/abci.cjs");
require("./types/index.cjs");
const require_errors_utility = require("./utility/errors.utility.cjs");
const require_adapters = require("./utility/adapters.cjs");
const require_requests_utility = require("./utility/requests.utility.cjs");
const require_provider_utility = require("./utility/provider.utility.cjs");
require("./utility/index.cjs");
//#region src/provider/provider.ts
/**
* Base provider implementation backed by a Tm2Client.
* Subclasses only need to provide a static `create()` factory.
*/
var BaseTm2Provider = class {
	constructor(client) {
		require_defineProperty._defineProperty(this, "client", void 0);
		this.client = client;
	}
	async estimateGas(tx) {
		const encodedTx = require_requests_utility.uint8ArrayToBase64(require_tx.Tx.encode(tx).finish());
		const rpcResponse = await this.client.abciQuery({
			path: ".app/simulate",
			data: new TextEncoder().encode(encodedTx),
			height: 0,
			prove: false
		});
		const abciResponse = require_adapters.adaptAbciQueryResponse(rpcResponse);
		const simulateResult = require_provider_utility.extractSimulateFromResponse(abciResponse);
		const resultErrorKey = simulateResult.response_base?.error?.type_url;
		if (resultErrorKey) throw require_errors_utility.constructRequestError(resultErrorKey);
		return simulateResult.gas_used;
	}
	async getBalance(address, denomination, height) {
		const rpcResponse = await this.client.abciQuery({
			path: `bank/balances/${address}`,
			data: new Uint8Array(),
			height: height ? height : 0,
			prove: false
		});
		const abciResponse = require_adapters.adaptAbciQueryResponse(rpcResponse);
		return require_provider_utility.extractBalanceFromResponse(abciResponse.response.ResponseBase.Data, denomination ? denomination : "ugnot");
	}
	async getBlock(height) {
		const rpcResponse = await this.client.block(height);
		return require_adapters.adaptBlockResponse(rpcResponse);
	}
	async getBlockResult(height) {
		const rpcResponse = await this.client.blockResults(height);
		return require_adapters.adaptBlockResultsResponse(rpcResponse);
	}
	async getBlockNumber() {
		const status = await this.getStatus();
		return parseInt(status.sync_info.latest_block_height);
	}
	async getConsensusParams(height) {
		const rpcResponse = await this.client.consensusParams(height);
		return require_adapters.adaptConsensusParamsResponse(rpcResponse);
	}
	getGasPrice() {
		return Promise.reject("not supported");
	}
	async getNetwork() {
		const rpcResponse = await this.client.netInfo();
		return require_adapters.adaptNetInfoResponse(rpcResponse);
	}
	async getAccountSequence(address, height) {
		const rpcResponse = await this.client.abciQuery({
			path: `auth/accounts/${address}`,
			data: new Uint8Array(),
			height: height ? height : 0,
			prove: false
		});
		const abciResponse = require_adapters.adaptAbciQueryResponse(rpcResponse);
		return require_provider_utility.extractSequenceFromResponse(abciResponse.response.ResponseBase.Data);
	}
	async getAccountNumber(address, height) {
		const rpcResponse = await this.client.abciQuery({
			path: `auth/accounts/${address}`,
			data: new Uint8Array(),
			height: height ? height : 0,
			prove: false
		});
		const abciResponse = require_adapters.adaptAbciQueryResponse(rpcResponse);
		return require_provider_utility.extractAccountNumberFromResponse(abciResponse.response.ResponseBase.Data);
	}
	async getAccount(address, height) {
		const rpcResponse = await this.client.abciQuery({
			path: `auth/accounts/${address}`,
			data: new Uint8Array(),
			height: height ? height : 0,
			prove: false
		});
		const abciResponse = require_adapters.adaptAbciQueryResponse(rpcResponse);
		return require_provider_utility.extractAccountFromResponse(abciResponse.response.ResponseBase.Data);
	}
	async getStatus() {
		const rpcResponse = await this.client.status();
		return require_adapters.adaptStatusResponse(rpcResponse);
	}
	async getTransaction(hash) {
		const hashBytes = Uint8Array.from((hash.match(/.{1,2}/g) ?? []).map((byte) => parseInt(byte, 16)));
		const rpcResponse = await this.client.tx({ hash: hashBytes });
		return require_adapters.adaptTxResponse(rpcResponse);
	}
	async sendTransaction(tx, endpoint) {
		const txBytes = Uint8Array.from(Buffer.from(tx, "base64"));
		switch (endpoint) {
			case require_endpoints.TransactionEndpoint.BROADCAST_TX_COMMIT: return this.broadcastTxCommit(txBytes);
			case require_endpoints.TransactionEndpoint.BROADCAST_TX_SYNC:
			default: return this.broadcastTxSync(txBytes);
		}
	}
	async broadcastTxSync(txBytes) {
		const rpcResponse = await this.client.broadcastTxSync({ tx: txBytes });
		const response = require_adapters.adaptBroadcastTxSyncResponse(rpcResponse);
		if (response.error) {
			const errType = response.error[require_abci.ABCIErrorKey];
			const log = response.Log;
			throw require_errors_utility.constructRequestError(errType, log);
		}
		return response;
	}
	async broadcastTxCommit(txBytes) {
		const rpcResponse = await this.client.broadcastTxCommit({ tx: txBytes });
		const response = require_adapters.adaptBroadcastTxCommitResponse(rpcResponse);
		const { check_tx, deliver_tx } = response;
		if (check_tx.ResponseBase.Error) {
			const errType = check_tx.ResponseBase.Error[require_abci.ABCIErrorKey];
			const log = check_tx.ResponseBase.Log;
			throw require_errors_utility.constructRequestError(errType, log);
		}
		if (deliver_tx.ResponseBase.Error) {
			const errType = deliver_tx.ResponseBase.Error[require_abci.ABCIErrorKey];
			const log = deliver_tx.ResponseBase.Log;
			throw require_errors_utility.constructRequestError(errType, log);
		}
		return response;
	}
	async waitForTransaction(hash, fromHeight, timeout) {
		return require_provider_utility.waitForTransaction(this, hash, fromHeight, timeout);
	}
};
//#endregion
exports.BaseTm2Provider = BaseTm2Provider;

//# sourceMappingURL=provider.cjs.map