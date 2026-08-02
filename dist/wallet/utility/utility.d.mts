import { HdPath } from "@cosmjs/crypto";

//#region src/wallet/utility/utility.d.ts
/**
 * Generates the HD path, for the specified index, in the form 'm/44'/118'/0'/0/i',
 * where 'i' is the account index
 * @param {number} [index=0] the account index
 */
declare const generateHDPath: (index?: number) => HdPath;
/**
 * Generates random entropy of the specified size (in B)
 * @param {number} [size=32] the entropy size in bytes
 */
declare const generateEntropy: (size?: number) => Uint8Array;
interface keyPair {
  privateKey: Uint8Array;
  publicKey: Uint8Array;
}
/**
 * Generates a new Secp256k1 key-pair using
 * the provided English mnemonic and account index
 * @param {string} mnemonic the English mnemonic
 * @param {number} [accountIndex=0] the account index
 */
declare const generateKeyPair: (mnemonic: string, accountIndex?: number) => Promise<keyPair>;
declare const defaultAddressPrefix = "g";
/**
 * Encodes a string into a Uint8Array
 * @param {string} str the string to be encoded
 */
declare const stringToUTF8: (str: string) => Uint8Array;
/**
 * Escapes <,>,& in string.
 * Golang's json marshaller escapes <,>,& by default.
 * https://cs.opensource.google/go/go/+/refs/tags/go1.20.6:src/encoding/json/encode.go;l=46-53
 */
declare function encodeCharacterSet(data: string): string;
/** Returns a JSON string with objects sorted by key */
declare function sortedJsonStringify(obj: any): string;
//#endregion
export { defaultAddressPrefix, encodeCharacterSet, generateEntropy, generateHDPath, generateKeyPair, sortedJsonStringify, stringToUTF8 };
//# sourceMappingURL=utility.d.mts.map