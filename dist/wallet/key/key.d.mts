import { Signer } from "../signer.mjs";

//#region src/wallet/key/key.d.ts
/**
 * KeySigner implements the logic for the private key signer
 */
declare class KeySigner implements Signer {
  private readonly privateKey;
  private readonly publicKey;
  private readonly addressPrefix;
  /**
   * Creates a new {@link KeySigner} instance
   * @param {Uint8Array} privateKey the raw Secp256k1 private key
   * @param {Uint8Array} publicKey the raw Secp256k1 public key
   * @param {string} addressPrefix the address prefix
   */
  constructor(privateKey: Uint8Array, publicKey: Uint8Array, addressPrefix?: string);
  getAddress: () => Promise<string>;
  getPublicKey: () => Promise<Uint8Array>;
  getPrivateKey: () => Promise<Uint8Array>;
  signData: (data: Uint8Array) => Promise<Uint8Array>;
  verifySignature: (data: Uint8Array, signature: Uint8Array) => Promise<boolean>;
}
//#endregion
export { KeySigner };
//# sourceMappingURL=key.d.mts.map