require("../../_virtual/_rolldown/runtime.cjs");
const require_defineProperty = require("../../_virtual/_@oxc-project_runtime@0.122.0/helpers/defineProperty.cjs");
require("../utility/utility.cjs");
require("../utility/index.cjs");
let _cosmjs_crypto = require("@cosmjs/crypto");
let _cosmjs_amino = require("@cosmjs/amino");
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
		require_defineProperty._defineProperty(this, "privateKey", void 0);
		require_defineProperty._defineProperty(this, "publicKey", void 0);
		require_defineProperty._defineProperty(this, "addressPrefix", void 0);
		require_defineProperty._defineProperty(this, "getAddress", async () => {
			return (0, _cosmjs_amino.pubkeyToAddress)((0, _cosmjs_amino.encodeSecp256k1Pubkey)(_cosmjs_crypto.Secp256k1.compressPubkey(this.publicKey)), this.addressPrefix);
		});
		require_defineProperty._defineProperty(this, "getPublicKey", async () => {
			return this.publicKey;
		});
		require_defineProperty._defineProperty(this, "getPrivateKey", async () => {
			return this.privateKey;
		});
		require_defineProperty._defineProperty(this, "signData", async (data) => {
			const signature = await _cosmjs_crypto.Secp256k1.createSignature((0, _cosmjs_crypto.sha256)(data), this.privateKey);
			return new Uint8Array([...signature.r(32), ...signature.s(32)]);
		});
		require_defineProperty._defineProperty(this, "verifySignature", async (data, signature) => {
			return _cosmjs_crypto.Secp256k1.verifySignature(_cosmjs_crypto.Secp256k1Signature.fromFixedLength(signature), (0, _cosmjs_crypto.sha256)(data), this.publicKey);
		});
		this.privateKey = privateKey;
		this.publicKey = publicKey;
		this.addressPrefix = addressPrefix;
	}
};
//#endregion
exports.KeySigner = KeySigner;

//# sourceMappingURL=key.cjs.map