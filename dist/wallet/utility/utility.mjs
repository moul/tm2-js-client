import { Bip39, EnglishMnemonic, Secp256k1, Slip10, Slip10Curve, Slip10RawIndex } from "@cosmjs/crypto";
import crypto from "crypto";
//#region src/wallet/utility/utility.ts
/**
* Generates the HD path, for the specified index, in the form 'm/44'/118'/0'/0/i',
* where 'i' is the account index
* @param {number} [index=0] the account index
*/
const generateHDPath = (index) => {
	return [
		Slip10RawIndex.hardened(44),
		Slip10RawIndex.hardened(118),
		Slip10RawIndex.hardened(0),
		Slip10RawIndex.normal(0),
		Slip10RawIndex.normal(index ? index : 0)
	];
};
/**
* Generates random entropy of the specified size (in B)
* @param {number} [size=32] the entropy size in bytes
*/
const generateEntropy = (size) => {
	const array = new Uint8Array(size ? size : 32);
	crypto.randomFillSync(array);
	return array;
};
/**
* Generates a new Secp256k1 key-pair using
* the provided English mnemonic and account index
* @param {string} mnemonic the English mnemonic
* @param {number} [accountIndex=0] the account index
*/
const generateKeyPair = async (mnemonic, accountIndex) => {
	const seed = await Bip39.mnemonicToSeed(new EnglishMnemonic(mnemonic));
	const { privkey: privateKey } = Slip10.derivePath(Slip10Curve.Secp256k1, seed, generateHDPath(accountIndex));
	const { pubkey: publicKey } = await Secp256k1.makeKeypair(privateKey);
	return {
		publicKey,
		privateKey
	};
};
const defaultAddressPrefix = "g";
/**
* Encodes a string into a Uint8Array
* @param {string} str the string to be encoded
*/
const stringToUTF8 = (str) => {
	return new TextEncoder().encode(str);
};
/**
* Escapes <,>,& in string.
* Golang's json marshaller escapes <,>,& by default.
* https://cs.opensource.google/go/go/+/refs/tags/go1.20.6:src/encoding/json/encode.go;l=46-53
*/
function encodeCharacterSet(data) {
	return data.replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}
function sortedObject(obj) {
	if (typeof obj !== "object" || obj === null) return obj;
	if (Array.isArray(obj)) return obj.map(sortedObject);
	const sortedKeys = Object.keys(obj).sort();
	const result = {};
	sortedKeys.forEach((key) => {
		result[key] = sortedObject(obj[key]);
	});
	return result;
}
/** Returns a JSON string with objects sorted by key */
function sortedJsonStringify(obj) {
	return JSON.stringify(sortedObject(obj));
}
//#endregion
export { defaultAddressPrefix, encodeCharacterSet, generateEntropy, generateHDPath, generateKeyPair, sortedJsonStringify, stringToUTF8 };

//# sourceMappingURL=utility.mjs.map