require("../../_virtual/_rolldown/runtime.cjs");
const require_defineProperty = require("../../_virtual/_@oxc-project_runtime@0.122.0/helpers/defineProperty.cjs");
const require_utility = require("../utility/utility.cjs");
require("../utility/index.cjs");
let _cosmjs_crypto = require("@cosmjs/crypto");
let _cosmjs_amino = require("@cosmjs/amino");
//#region src/wallet/ledger/ledger.ts
/**
* LedgerSigner implements the logic for the Ledger device signer
*/
var LedgerSigner = class {
	/**
	* Creates a new Ledger device signer instance
	* @param {LedgerConnector} connector the Ledger connector
	* @param {number} accountIndex the desired account index
	* @param {string} addressPrefix the address prefix
	*/
	constructor(connector, accountIndex, addressPrefix = "g") {
		require_defineProperty._defineProperty(this, "connector", void 0);
		require_defineProperty._defineProperty(this, "hdPath", void 0);
		require_defineProperty._defineProperty(this, "addressPrefix", void 0);
		require_defineProperty._defineProperty(this, "getAddress", async () => {
			if (!this.connector) throw new Error("Ledger not connected");
			const compressedPubKey = await this.connector.getPubkey(this.hdPath);
			return (0, _cosmjs_amino.pubkeyToAddress)((0, _cosmjs_amino.encodeSecp256k1Pubkey)(compressedPubKey), this.addressPrefix);
		});
		require_defineProperty._defineProperty(this, "getPublicKey", async () => {
			if (!this.connector) throw new Error("Ledger not connected");
			return this.connector.getPubkey(this.hdPath);
		});
		require_defineProperty._defineProperty(this, "getPrivateKey", async () => {
			throw new Error("Ledger does not support private key exports");
		});
		require_defineProperty._defineProperty(this, "signData", async (data) => {
			if (!this.connector) throw new Error("Ledger not connected");
			return this.connector.sign(data, this.hdPath);
		});
		require_defineProperty._defineProperty(this, "verifySignature", async (data, signature) => {
			const publicKey = await this.getPublicKey();
			return _cosmjs_crypto.Secp256k1.verifySignature(_cosmjs_crypto.Secp256k1Signature.fromFixedLength(signature), (0, _cosmjs_crypto.sha256)(data), publicKey);
		});
		this.connector = connector;
		this.hdPath = require_utility.generateHDPath(accountIndex);
		this.addressPrefix = addressPrefix;
	}
};
//#endregion
exports.LedgerSigner = LedgerSigner;

//# sourceMappingURL=ledger.cjs.map