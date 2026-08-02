require("../_virtual/_rolldown/runtime.cjs");
const require_tx = require("../proto/tm2/tx.cjs");
require("../proto/index.cjs");
const require_defineProperty = require("../_virtual/_@oxc-project_runtime@0.122.0/helpers/defineProperty.cjs");
const require_requests_utility = require("../provider/utility/requests.utility.cjs");
require("../provider/index.cjs");
const require_utility = require("./utility/utility.cjs");
require("./utility/index.cjs");
const require_key = require("./key/key.cjs");
require("./key/index.cjs");
const require_ledger = require("./ledger/ledger.cjs");
require("./ledger/index.cjs");
const require_sign = require("./types/sign.cjs");
require("./types/index.cjs");
let _cosmjs_crypto = require("@cosmjs/crypto");
//#region src/wallet/wallet.ts
var _Wallet;
/**
* Wallet is a single account abstraction
* that can interact with the blockchain
*/
var Wallet = class {
	constructor() {
		require_defineProperty._defineProperty(
			this,
			/**
			* Connects the wallet to the specified {@link Provider}
			* @param {Provider} provider the active {@link Provider}, if any
			*/
			"connect",
			(provider) => {
				this.provider = provider;
			}
		);
		require_defineProperty._defineProperty(
			this,
			/**
			* Fetches the address associated with the wallet
			*/
			"getAddress",
			() => {
				return this.signer.getAddress();
			}
		);
		require_defineProperty._defineProperty(
			this,
			/**
			* Fetches the account sequence for the wallet
			* @param {number} [height=latest] the block height
			*/
			"getAccountSequence",
			async (height) => {
				if (!this.provider) throw new Error("provider not connected");
				const address = await this.getAddress();
				return this.provider.getAccountSequence(address, height);
			}
		);
		require_defineProperty._defineProperty(
			this,
			/**
			* Fetches the account number for the wallet. Errors out if the
			* account is not initialized
			* @param {number} [height=latest] the block height
			*/
			"getAccountNumber",
			async (height) => {
				if (!this.provider) throw new Error("provider not connected");
				const address = await this.getAddress();
				return this.provider.getAccountNumber(address, height);
			}
		);
		require_defineProperty._defineProperty(
			this,
			/**
			* Fetches the account balance for the specific denomination
			* @param {string} [denomination=ugnot] the fund denomination
			*/
			"getBalance",
			async (denomination) => {
				if (!this.provider) throw new Error("provider not connected");
				const address = await this.getAddress();
				return this.provider.getBalance(address, denomination ? denomination : "ugnot");
			}
		);
		require_defineProperty._defineProperty(
			this,
			/**
			* Fetches the current (recommended) average gas price
			*/
			"getGasPrice",
			async () => {
				if (!this.provider) throw new Error("provider not connected");
				return this.provider.getGasPrice();
			}
		);
		require_defineProperty._defineProperty(
			this,
			/**
			* Estimates the gas limit for the transaction
			* @param {Tx} tx the transaction that needs estimating
			*/
			"estimateGas",
			async (tx) => {
				if (!this.provider) throw new Error("provider not connected");
				return this.provider.estimateGas(tx);
			}
		);
		require_defineProperty._defineProperty(
			this,
			/**
			* Returns the connected provider, if any
			*/
			"getProvider",
			() => {
				return this.provider;
			}
		);
		require_defineProperty._defineProperty(
			this,
			/**
			* Generates a transaction signature, and appends it to the transaction
			* @param {Tx} tx the transaction to be signed
			* @param {(messages: Any[]) => any[]} decodeTxMessages tx message decode callback
			* that should expand the concrete message fields into an object. Required because
			* the transaction sign bytes are generated using sorted JSON, which requires
			* encoded message values to be decoded for sorting
			*/
			"signTransaction",
			async (tx, decodeTxMessages, opts) => {
				if (!this.provider) throw new Error("provider not connected");
				if (!tx.fee) throw new Error("invalid transaction fee provided");
				const chainID = (await this.provider.getStatus()).node_info.network;
				let accountNumber = opts?.accountNumber;
				let accountSequence = opts?.sequence;
				if (accountNumber === void 0 || accountSequence === void 0) {
					const address = await this.getAddress();
					const account = await this.provider.getAccount(address);
					if (accountNumber === void 0) accountNumber = account.BaseAccount.account_number;
					if (accountSequence === void 0) accountSequence = account.BaseAccount.sequence;
				}
				const publicKey = await this.signer.getPublicKey();
				const signPayload = {
					chain_id: chainID,
					account_number: accountNumber,
					sequence: accountSequence,
					fee: {
						gas_fee: tx.fee.gas_fee,
						gas_wanted: tx.fee.gas_wanted.toString(10)
					},
					msgs: decodeTxMessages(tx.messages),
					memo: tx.memo
				};
				const signBytes = require_utility.stringToUTF8(require_utility.encodeCharacterSet(require_utility.sortedJsonStringify(signPayload)));
				const wrappedKey = { key: publicKey };
				const txSignature = {
					pub_key: {
						type_url: require_sign.Secp256k1PubKeyType,
						value: require_tx.PubKeySecp256k1.encode(wrappedKey).finish()
					},
					signature: await this.getSigner().signData(signBytes)
				};
				return {
					...tx,
					signatures: [...tx.signatures, txSignature]
				};
			}
		);
		require_defineProperty._defineProperty(
			this,
			/**
			* Returns the associated signer
			*/
			"getSigner",
			() => {
				return this.signer;
			}
		);
	}
	/**
	* Encodes and sends the transaction. If the type of endpoint
	* is a broadcast commit, waits for the transaction to be committed to the chain.
	* The transaction needs to be signed beforehand.
	* Returns the transaction hash (base-64)
	* @param {Tx} tx the signed transaction
	* @param {BroadcastType} endpoint the transaction broadcast type (sync / commit)
	*/
	async sendTransaction(tx, endpoint) {
		if (!this.provider) throw new Error("provider not connected");
		const encodedTx = require_requests_utility.uint8ArrayToBase64(require_tx.Tx.encode(tx).finish());
		return this.provider.sendTransaction(encodedTx, endpoint);
	}
};
_Wallet = Wallet;
require_defineProperty._defineProperty(Wallet, "createRandom", async (options) => {
	const { publicKey, privateKey } = await require_utility.generateKeyPair(_cosmjs_crypto.Bip39.encode(require_utility.generateEntropy()).toString(), 0);
	const wallet = new _Wallet();
	wallet.signer = new require_key.KeySigner(privateKey, _cosmjs_crypto.Secp256k1.compressPubkey(publicKey), options?.addressPrefix);
	return wallet;
});
require_defineProperty._defineProperty(Wallet, "fromSigner", async (signer) => {
	const wallet = new _Wallet();
	wallet.signer = signer;
	return wallet;
});
require_defineProperty._defineProperty(Wallet, "fromMnemonic", async (mnemonic, options) => {
	const { publicKey, privateKey } = await require_utility.generateKeyPair(mnemonic, options?.accountIndex);
	const wallet = new _Wallet();
	wallet.signer = new require_key.KeySigner(privateKey, _cosmjs_crypto.Secp256k1.compressPubkey(publicKey), options?.addressPrefix);
	return wallet;
});
require_defineProperty._defineProperty(Wallet, "fromPrivateKey", async (privateKey, options) => {
	const { pubkey: publicKey } = await _cosmjs_crypto.Secp256k1.makeKeypair(privateKey);
	const wallet = new _Wallet();
	wallet.signer = new require_key.KeySigner(privateKey, _cosmjs_crypto.Secp256k1.compressPubkey(publicKey), options?.addressPrefix);
	return wallet;
});
require_defineProperty._defineProperty(Wallet, "fromLedger", (connector, options) => {
	const wallet = new _Wallet();
	wallet.signer = new require_ledger.LedgerSigner(connector, options?.accountIndex ?? 0, options?.addressPrefix);
	return wallet;
});
//#endregion
exports.Wallet = Wallet;

//# sourceMappingURL=wallet.cjs.map