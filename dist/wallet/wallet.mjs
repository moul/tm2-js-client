import { PubKeySecp256k1, Tx } from "../proto/tm2/tx.mjs";
import "../proto/index.mjs";
import { _defineProperty } from "../_virtual/_@oxc-project_runtime@0.122.0/helpers/defineProperty.mjs";
import { uint8ArrayToBase64 } from "../provider/utility/requests.utility.mjs";
import "../provider/index.mjs";
import { encodeCharacterSet, generateEntropy, generateKeyPair, sortedJsonStringify, stringToUTF8 } from "./utility/utility.mjs";
import "./utility/index.mjs";
import { KeySigner } from "./key/key.mjs";
import "./key/index.mjs";
import { LedgerSigner } from "./ledger/ledger.mjs";
import "./ledger/index.mjs";
import { Secp256k1PubKeyType } from "./types/sign.mjs";
import "./types/index.mjs";
import { Bip39, Secp256k1 } from "@cosmjs/crypto";
//#region src/wallet/wallet.ts
var _Wallet;
/**
* Wallet is a single account abstraction
* that can interact with the blockchain
*/
var Wallet = class {
	constructor() {
		_defineProperty(
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
		_defineProperty(
			this,
			/**
			* Fetches the address associated with the wallet
			*/
			"getAddress",
			() => {
				return this.signer.getAddress();
			}
		);
		_defineProperty(
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
		_defineProperty(
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
		_defineProperty(
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
		_defineProperty(
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
		_defineProperty(
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
		_defineProperty(
			this,
			/**
			* Returns the connected provider, if any
			*/
			"getProvider",
			() => {
				return this.provider;
			}
		);
		_defineProperty(
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
				const signBytes = stringToUTF8(encodeCharacterSet(sortedJsonStringify({
					chain_id: chainID,
					account_number: accountNumber,
					sequence: accountSequence,
					fee: {
						gas_fee: tx.fee.gas_fee,
						gas_wanted: tx.fee.gas_wanted.toString(10)
					},
					msgs: decodeTxMessages(tx.messages),
					memo: tx.memo
				})));
				const wrappedKey = { key: publicKey };
				const txSignature = {
					pub_key: {
						type_url: Secp256k1PubKeyType,
						value: PubKeySecp256k1.encode(wrappedKey).finish()
					},
					signature: await this.getSigner().signData(signBytes)
				};
				return {
					...tx,
					signatures: [...tx.signatures, txSignature]
				};
			}
		);
		_defineProperty(
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
		const encodedTx = uint8ArrayToBase64(Tx.encode(tx).finish());
		return this.provider.sendTransaction(encodedTx, endpoint);
	}
};
_Wallet = Wallet;
_defineProperty(Wallet, "createRandom", async (options) => {
	const { publicKey, privateKey } = await generateKeyPair(Bip39.encode(generateEntropy()).toString(), 0);
	const wallet = new _Wallet();
	wallet.signer = new KeySigner(privateKey, Secp256k1.compressPubkey(publicKey), options?.addressPrefix);
	return wallet;
});
_defineProperty(Wallet, "fromSigner", async (signer) => {
	const wallet = new _Wallet();
	wallet.signer = signer;
	return wallet;
});
_defineProperty(Wallet, "fromMnemonic", async (mnemonic, options) => {
	const { publicKey, privateKey } = await generateKeyPair(mnemonic, options?.accountIndex);
	const wallet = new _Wallet();
	wallet.signer = new KeySigner(privateKey, Secp256k1.compressPubkey(publicKey), options?.addressPrefix);
	return wallet;
});
_defineProperty(Wallet, "fromPrivateKey", async (privateKey, options) => {
	const { pubkey: publicKey } = await Secp256k1.makeKeypair(privateKey);
	const wallet = new _Wallet();
	wallet.signer = new KeySigner(privateKey, Secp256k1.compressPubkey(publicKey), options?.addressPrefix);
	return wallet;
});
_defineProperty(Wallet, "fromLedger", (connector, options) => {
	const wallet = new _Wallet();
	wallet.signer = new LedgerSigner(connector, options?.accountIndex ?? 0, options?.addressPrefix);
	return wallet;
});
//#endregion
export { Wallet };

//# sourceMappingURL=wallet.mjs.map