import { _defineProperty } from "../../_virtual/_@oxc-project_runtime@0.122.0/helpers/defineProperty.mjs";
import { generateHDPath } from "../utility/utility.mjs";
import "../utility/index.mjs";
import { Secp256k1, Secp256k1Signature, sha256 } from "@cosmjs/crypto";
import { encodeSecp256k1Pubkey, pubkeyToAddress } from "@cosmjs/amino";
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
		_defineProperty(this, "connector", void 0);
		_defineProperty(this, "hdPath", void 0);
		_defineProperty(this, "addressPrefix", void 0);
		_defineProperty(this, "getAddress", async () => {
			if (!this.connector) throw new Error("Ledger not connected");
			return pubkeyToAddress(encodeSecp256k1Pubkey(await this.connector.getPubkey(this.hdPath)), this.addressPrefix);
		});
		_defineProperty(this, "getPublicKey", async () => {
			if (!this.connector) throw new Error("Ledger not connected");
			return this.connector.getPubkey(this.hdPath);
		});
		_defineProperty(this, "getPrivateKey", async () => {
			throw new Error("Ledger does not support private key exports");
		});
		_defineProperty(this, "signData", async (data) => {
			if (!this.connector) throw new Error("Ledger not connected");
			return this.connector.sign(data, this.hdPath);
		});
		_defineProperty(this, "verifySignature", async (data, signature) => {
			const publicKey = await this.getPublicKey();
			return Secp256k1.verifySignature(Secp256k1Signature.fromFixedLength(signature), sha256(data), publicKey);
		});
		this.connector = connector;
		this.hdPath = generateHDPath(accountIndex);
		this.addressPrefix = addressPrefix;
	}
};
//#endregion
export { LedgerSigner };

//# sourceMappingURL=ledger.mjs.map