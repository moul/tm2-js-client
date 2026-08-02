import { _defineProperty } from "../../_virtual/_@oxc-project_runtime@0.122.0/helpers/defineProperty.mjs";
import "../utility/utility.mjs";
import "../utility/index.mjs";
import { Secp256k1, Secp256k1Signature, sha256 } from "@cosmjs/crypto";
import { encodeSecp256k1Pubkey, pubkeyToAddress } from "@cosmjs/amino";
//#region src/wallet/key/key.ts
/**
* KeySigner implements the logic for the private key signer
*/
var KeySigner = class {
	/**
	* Creates a new {@link KeySigner} instance
	* @param {Uint8Array} privateKey the raw Secp256k1 private key
	* @param {Uint8Array} publicKey the raw Secp256k1 public key
	* @param {string} addressPrefix the address prefix
	*/
	constructor(privateKey, publicKey, addressPrefix = "g") {
		_defineProperty(this, "privateKey", void 0);
		_defineProperty(this, "publicKey", void 0);
		_defineProperty(this, "addressPrefix", void 0);
		_defineProperty(this, "getAddress", async () => {
			return pubkeyToAddress(encodeSecp256k1Pubkey(Secp256k1.compressPubkey(this.publicKey)), this.addressPrefix);
		});
		_defineProperty(this, "getPublicKey", async () => {
			return this.publicKey;
		});
		_defineProperty(this, "getPrivateKey", async () => {
			return this.privateKey;
		});
		_defineProperty(this, "signData", async (data) => {
			const signature = await Secp256k1.createSignature(sha256(data), this.privateKey);
			return new Uint8Array([...signature.r(32), ...signature.s(32)]);
		});
		_defineProperty(this, "verifySignature", async (data, signature) => {
			return Secp256k1.verifySignature(Secp256k1Signature.fromFixedLength(signature), sha256(data), this.publicKey);
		});
		this.privateKey = privateKey;
		this.publicKey = publicKey;
		this.addressPrefix = addressPrefix;
	}
};
//#endregion
export { KeySigner };

//# sourceMappingURL=key.mjs.map