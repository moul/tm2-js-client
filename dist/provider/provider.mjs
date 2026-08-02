import { Tx } from "../proto/tm2/tx.mjs";
import "../proto/index.mjs";
import { TransactionEndpoint } from "./endpoints.mjs";
import { _defineProperty } from "../_virtual/_@oxc-project_runtime@0.122.0/helpers/defineProperty.mjs";
import { ABCIErrorKey } from "./types/abci.mjs";
import "./types/index.mjs";
import { constructRequestError } from "./utility/errors.utility.mjs";
import { adaptAbciQueryResponse, adaptBlockResponse, adaptBlockResultsResponse, adaptBroadcastTxCommitResponse, adaptBroadcastTxSyncResponse, adaptConsensusParamsResponse, adaptNetInfoResponse, adaptStatusResponse, adaptTxResponse } from "./utility/adapters.mjs";
import { uint8ArrayToBase64 } from "./utility/requests.utility.mjs";
import { extractAccountFromResponse, extractAccountNumberFromResponse, extractBalanceFromResponse, extractSequenceFromResponse, extractSimulateFromResponse, waitForTransaction } from "./utility/provider.utility.mjs";
import "./utility/index.mjs";
//#region src/provider/provider.ts
/**
* Base provider implementation backed by a Tm2Client.
* Subclasses only need to provide a static `create()` factory.
*/
var BaseTm2Provider = class {
	constructor(client) {
		_defineProperty(this, "client", void 0);
		this.client = client;
	}
	async estimateGas(tx) {
		const encodedTx = uint8ArrayToBase64(Tx.encode(tx).finish());
		const simulateResult = extractSimulateFromResponse(adaptAbciQueryResponse(await this.client.abciQuery({
			path: ".app/simulate",
			data: new TextEncoder().encode(encodedTx),
			height: 0,
			prove: false
		})));
		const resultErrorKey = simulateResult.response_base?.error?.type_url;
		if (resultErrorKey) throw constructRequestError(resultErrorKey);
		return simulateResult.gas_used;
	}
	async getBalance(address, denomination, height) {
		return extractBalanceFromResponse(adaptAbciQueryResponse(await this.client.abciQuery({
			path: `bank/balances/${address}`,
			data: new Uint8Array(),
			height: height ? height : 0,
			prove: false
		})).response.ResponseBase.Data, denomination ? denomination : "ugnot");
	}
	async getBlock(height) {
		return adaptBlockResponse(await this.client.block(height));
	}
	async getBlockResult(height) {
		return adaptBlockResultsResponse(await this.client.blockResults(height));
	}
	async getBlockNumber() {
		const status = await this.getStatus();
		return parseInt(status.sync_info.latest_block_height);
	}
	async getConsensusParams(height) {
		return adaptConsensusParamsResponse(await this.client.consensusParams(height));
	}
	getGasPrice() {
		return Promise.reject("not supported");
	}
	async getNetwork() {
		return adaptNetInfoResponse(await this.client.netInfo());
	}
	async getAccountSequence(address, height) {
		return extractSequenceFromResponse(adaptAbciQueryResponse(await this.client.abciQuery({
			path: `auth/accounts/${address}`,
			data: new Uint8Array(),
			height: height ? height : 0,
			prove: false
		})).response.ResponseBase.Data);
	}
	async getAccountNumber(address, height) {
		return extractAccountNumberFromResponse(adaptAbciQueryResponse(await this.client.abciQuery({
			path: `auth/accounts/${address}`,
			data: new Uint8Array(),
			height: height ? height : 0,
			prove: false
		})).response.ResponseBase.Data);
	}
	async getAccount(address, height) {
		return extractAccountFromResponse(adaptAbciQueryResponse(await this.client.abciQuery({
			path: `auth/accounts/${address}`,
			data: new Uint8Array(),
			height: height ? height : 0,
			prove: false
		})).response.ResponseBase.Data);
	}
	async getStatus() {
		return adaptStatusResponse(await this.client.status());
	}
	async getTransaction(hash) {
		const hashBytes = Uint8Array.from((hash.match(/.{1,2}/g) ?? []).map((byte) => parseInt(byte, 16)));
		return adaptTxResponse(await this.client.tx({ hash: hashBytes }));
	}
	async sendTransaction(tx, endpoint) {
		const txBytes = Uint8Array.from(Buffer.from(tx, "base64"));
		switch (endpoint) {
			case TransactionEndpoint.BROADCAST_TX_COMMIT: return this.broadcastTxCommit(txBytes);
			case TransactionEndpoint.BROADCAST_TX_SYNC:
			default: return this.broadcastTxSync(txBytes);
		}
	}
	async broadcastTxSync(txBytes) {
		const response = adaptBroadcastTxSyncResponse(await this.client.broadcastTxSync({ tx: txBytes }));
		if (response.error) {
			const errType = response.error[ABCIErrorKey];
			const log = response.Log;
			throw constructRequestError(errType, log);
		}
		return response;
	}
	async broadcastTxCommit(txBytes) {
		const response = adaptBroadcastTxCommitResponse(await this.client.broadcastTxCommit({ tx: txBytes }));
		const { check_tx, deliver_tx } = response;
		if (check_tx.ResponseBase.Error) {
			const errType = check_tx.ResponseBase.Error[ABCIErrorKey];
			const log = check_tx.ResponseBase.Log;
			throw constructRequestError(errType, log);
		}
		if (deliver_tx.ResponseBase.Error) {
			const errType = deliver_tx.ResponseBase.Error[ABCIErrorKey];
			const log = deliver_tx.ResponseBase.Log;
			throw constructRequestError(errType, log);
		}
		return response;
	}
	async waitForTransaction(hash, fromHeight, timeout) {
		return waitForTransaction(this, hash, fromHeight, timeout);
	}
};
//#endregion
export { BaseTm2Provider };

//# sourceMappingURL=provider.mjs.map