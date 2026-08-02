import { Signer } from "../signer.cjs";
import { LedgerConnector } from "@cosmjs/ledger-amino";

//#region src/wallet/ledger/ledger.d.ts
/**
 * LedgerSigner implements the logic for the Ledger device signer
 */
declare class LedgerSigner implements Signer {
  private readonly connector;
  private readonly hdPath;
  private readonly addressPrefix;
  /**
   * Creates a new Ledger device signer instance
   * @param {LedgerConnector} connector the Ledger connector
   * @param {number} accountIndex the desired account index
   * @param {string} addressPrefix the address prefix
   */
  constructor(connector: LedgerConnector, accountIndex: number, addressPrefix?: string);
  getAddress: () => Promise<string>;
  getPublicKey: () => Promise<Uint8Array>;
  getPrivateKey: () => Promise<Uint8Array>;
  signData: (data: Uint8Array) => Promise<Uint8Array>;
  verifySignature: (data: Uint8Array, signature: Uint8Array) => Promise<boolean>;
}
//#endregion
export { LedgerSigner };
//# sourceMappingURL=ledger.d.cts.map