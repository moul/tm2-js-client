import { ResponseDeliverTx } from "../../proto/tm2/abci.mjs";
import { Tx } from "../../proto/tm2/tx.mjs";
import { ABCIAccount, ABCIResponse } from "../types/abci.mjs";
import { Provider } from "../provider.mjs";

//#region src/provider/utility/provider.utility.d.ts
/**
 * Extracts the specific balance denomination from the ABCI response
 * @param {string | null} abciData the base64-encoded ABCI data
 * @param {string} denomination the required denomination
 */
declare const extractBalanceFromResponse: (abciData: string | null, denomination: string) => number;
/**
 * Extracts the account sequence from the ABCI response
 * @param {string | null} abciData the base64-encoded ABCI data
 */
declare const extractSequenceFromResponse: (abciData: string | null) => number;
/**
 * Extracts the account number from the ABCI response
 * @param {string | null} abciData the base64-encoded ABCI data
 */
declare const extractAccountNumberFromResponse: (abciData: string | null) => number;
/**
 * Extracts the account from the ABCI response
 * @param {string | null} abciData the base64-encoded ABCI data
 */
declare const extractAccountFromResponse: (abciData: string | null) => ABCIAccount;
/**
 * Extracts the simulate transaction response from the ABCI response value
 * @param {string | null} abciData the base64-encoded ResponseDeliverTx proto message
 */
declare const extractSimulateFromResponse: (abciResponse: ABCIResponse | null) => ResponseDeliverTx;
/**
 * Waits for the transaction to be committed to a block in the chain
 * of the specified provider. This helper does a search for incoming blocks
 * and checks if a transaction
 * @param {Provider} provider the provider instance
 * @param {string} hash the base64-encoded hash of the transaction
 * @param {number} [fromHeight=latest] the starting height for the search. If omitted, it is the latest block in the chain
 * @param {number} [timeout=15000] the timeout in MS for the search
 */
declare const waitForTransaction: (provider: Provider, hash: string, fromHeight?: number, timeout?: number) => Promise<Tx>;
//#endregion
export { extractAccountFromResponse, extractAccountNumberFromResponse, extractBalanceFromResponse, extractSequenceFromResponse, extractSimulateFromResponse, waitForTransaction };
//# sourceMappingURL=provider.utility.d.mts.map