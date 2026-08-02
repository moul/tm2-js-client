require("../../_virtual/_rolldown/runtime.cjs");
const require_abci = require("../../proto/tm2/abci.cjs");
const require_tx = require("../../proto/tm2/tx.cjs");
require("../../proto/index.cjs");
const require_abci$1 = require("../types/abci.cjs");
require("../types/index.cjs");
const require_errors_utility = require("./errors.utility.cjs");
const require_requests_utility = require("./requests.utility.cjs");
let _cosmjs_crypto = require("@cosmjs/crypto");
//#region src/provider/utility/provider.utility.ts
/**
* Extracts the specific balance denomination from the ABCI response
* @param {string | null} abciData the base64-encoded ABCI data
* @param {string} denomination the required denomination
*/
const extractBalanceFromResponse = (abciData, denomination) => {
	if (!abciData) return 0;
	const balances = Buffer.from(abciData, "base64").toString().replace(/"/gi, "").split(",");
	if (balances.length < 1) return 0;
	const pattern = new RegExp(`^(\\d+)${denomination}$`);
	for (const balance of balances) {
		const match = balance.match(pattern);
		if (match) return parseInt(match[1], 10);
	}
	return 0;
};
/**
* Extracts the account sequence from the ABCI response
* @param {string | null} abciData the base64-encoded ABCI data
*/
const extractSequenceFromResponse = (abciData) => {
	if (!abciData) return 0;
	try {
		const account = require_requests_utility.parseABCI(abciData);
		return parseInt(account.BaseAccount.sequence, 10);
	} catch (_e) {}
	return 0;
};
/**
* Extracts the account number from the ABCI response
* @param {string | null} abciData the base64-encoded ABCI data
*/
const extractAccountNumberFromResponse = (abciData) => {
	if (!abciData) throw new Error("account is not initialized");
	try {
		const account = require_requests_utility.parseABCI(abciData);
		return parseInt(account.BaseAccount.account_number, 10);
	} catch (e) {
		throw new Error("account is not initialized", { cause: e });
	}
};
/**
* Extracts the account from the ABCI response
* @param {string | null} abciData the base64-encoded ABCI data
*/
const extractAccountFromResponse = (abciData) => {
	if (!abciData) throw new Error("account is not initialized");
	try {
		return require_requests_utility.parseABCI(abciData);
	} catch (e) {
		throw new Error("account is not initialized", { cause: e });
	}
};
/**
* Extracts the simulate transaction response from the ABCI response value
* @param {string | null} abciData the base64-encoded ResponseDeliverTx proto message
*/
const extractSimulateFromResponse = (abciResponse) => {
	if (!abciResponse) throw new Error("abci data is not initialized");
	const error = abciResponse.response?.ResponseBase?.Error;
	if (error && error["@type"]) throw require_errors_utility.constructRequestError(error[require_abci$1.ABCIErrorKey]);
	const value = abciResponse.response.Value;
	if (!value) throw new Error("abci data is not initialized");
	try {
		return require_requests_utility.parseProto(value, require_abci.ResponseDeliverTx.decode);
	} catch (e) {
		throw new Error("unable to parse simulate response", { cause: e });
	}
};
/**
* Waits for the transaction to be committed to a block in the chain
* of the specified provider. This helper does a search for incoming blocks
* and checks if a transaction
* @param {Provider} provider the provider instance
* @param {string} hash the base64-encoded hash of the transaction
* @param {number} [fromHeight=latest] the starting height for the search. If omitted, it is the latest block in the chain
* @param {number} [timeout=15000] the timeout in MS for the search
*/
const waitForTransaction = async (provider, hash, fromHeight, timeout) => {
	let currentHeight = fromHeight ? fromHeight : await provider.getBlockNumber();
	return new Promise((resolve, reject) => {
		const exitTimeout = timeout ? timeout : 15e3;
		const fetchInterval = setInterval(async () => {
			const latestHeight = await provider.getBlockNumber();
			if (latestHeight < currentHeight) return;
			for (let blockNum = currentHeight; blockNum <= latestHeight; blockNum++) {
				const block = await provider.getBlock(blockNum);
				if (!block.block.data.txs || block.block.data.txs.length == 0) continue;
				for (const tx of block.block.data.txs) {
					const txRaw = require_requests_utility.base64ToUint8Array(tx);
					const txHash = (0, _cosmjs_crypto.sha256)(txRaw);
					if (require_requests_utility.uint8ArrayToBase64(txHash) == hash) {
						clearInterval(fetchInterval);
						resolve(require_tx.Tx.decode(txRaw));
					}
				}
			}
			currentHeight = latestHeight + 1;
		}, 1e3);
		setTimeout(() => {
			clearInterval(fetchInterval);
			reject("transaction fetch timeout");
		}, exitTimeout);
	});
};
//#endregion
exports.extractAccountFromResponse = extractAccountFromResponse;
exports.extractAccountNumberFromResponse = extractAccountNumberFromResponse;
exports.extractBalanceFromResponse = extractBalanceFromResponse;
exports.extractSequenceFromResponse = extractSequenceFromResponse;
exports.extractSimulateFromResponse = extractSimulateFromResponse;
exports.waitForTransaction = waitForTransaction;

//# sourceMappingURL=provider.utility.cjs.map