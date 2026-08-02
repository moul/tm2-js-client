import { ResponseDeliverTx } from "../../proto/tm2/abci.mjs";
import { Tx } from "../../proto/tm2/tx.mjs";
import "../../proto/index.mjs";
import { ABCIErrorKey } from "../types/abci.mjs";
import "../types/index.mjs";
import { constructRequestError } from "./errors.utility.mjs";
import { base64ToUint8Array, parseABCI, parseProto, uint8ArrayToBase64 } from "./requests.utility.mjs";
import { sha256 } from "@cosmjs/crypto";
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
		const account = parseABCI(abciData);
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
		const account = parseABCI(abciData);
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
		return parseABCI(abciData);
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
	if (error && error["@type"]) throw constructRequestError(error[ABCIErrorKey]);
	const value = abciResponse.response.Value;
	if (!value) throw new Error("abci data is not initialized");
	try {
		return parseProto(value, ResponseDeliverTx.decode);
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
					const txRaw = base64ToUint8Array(tx);
					if (uint8ArrayToBase64(sha256(txRaw)) == hash) {
						clearInterval(fetchInterval);
						resolve(Tx.decode(txRaw));
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
export { extractAccountFromResponse, extractAccountNumberFromResponse, extractBalanceFromResponse, extractSequenceFromResponse, extractSimulateFromResponse, waitForTransaction };

//# sourceMappingURL=provider.utility.mjs.map