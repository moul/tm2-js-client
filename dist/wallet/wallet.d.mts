import { Any } from "../proto/google/protobuf/any.mjs";
import { Tx } from "../proto/tm2/tx.mjs";
import { BroadcastTransactionMap } from "../provider/types/common.mjs";
import { Provider } from "../provider/provider.mjs";
import { Signer } from "./signer.mjs";
import { AccountWalletOption, CreateWalletOptions } from "./types/wallet.mjs";
import { LedgerConnector } from "@cosmjs/ledger-amino";

//#region src/wallet/wallet.d.ts
interface SignTransactionOptions {
  accountNumber?: string;
  sequence?: string;
}
/**
 * Wallet is a single account abstraction
 * that can interact with the blockchain
 */
declare class Wallet {
  protected provider: Provider;
  protected signer: Signer;
  /**
   * Connects the wallet to the specified {@link Provider}
   * @param {Provider} provider the active {@link Provider}, if any
   */
  connect: (provider: Provider) => void;
  /**
   * Generates a private key-based wallet, using a random seed
   * @param {AccountWalletOption} options the account options
   */
  static createRandom: (options?: AccountWalletOption) => Promise<Wallet>;
  /**
   * Generates a custom signer-based wallet
   * @param {Signer} signer the custom signer implementing the Signer interface
   * @param {CreateWalletOptions} options the wallet generation options
   */
  static fromSigner: (signer: Signer) => Promise<Wallet>;
  /**
   * Generates a bip39 mnemonic-based wallet
   * @param {string} mnemonic the bip39 mnemonic
   * @param {CreateWalletOptions} options the wallet generation options
   */
  static fromMnemonic: (mnemonic: string, options?: CreateWalletOptions) => Promise<Wallet>;
  /**
   * Generates a private key-based wallet
   * @param {string} privateKey the private key
   * @param {AccountWalletOption} options the account options
   */
  static fromPrivateKey: (privateKey: Uint8Array, options?: AccountWalletOption) => Promise<Wallet>;
  /**
   * Creates a Ledger-based wallet
   * @param {LedgerConnector} connector the Ledger device connector
   * @param {CreateWalletOptions} options the wallet generation options
   */
  static fromLedger: (connector: LedgerConnector, options?: CreateWalletOptions) => Wallet;
  /**
   * Fetches the address associated with the wallet
   */
  getAddress: () => Promise<string>;
  /**
   * Fetches the account sequence for the wallet
   * @param {number} [height=latest] the block height
   */
  getAccountSequence: (height?: number) => Promise<number>;
  /**
   * Fetches the account number for the wallet. Errors out if the
   * account is not initialized
   * @param {number} [height=latest] the block height
   */
  getAccountNumber: (height?: number) => Promise<number>;
  /**
   * Fetches the account balance for the specific denomination
   * @param {string} [denomination=ugnot] the fund denomination
   */
  getBalance: (denomination?: string) => Promise<number>;
  /**
   * Fetches the current (recommended) average gas price
   */
  getGasPrice: () => Promise<number>;
  /**
   * Estimates the gas limit for the transaction
   * @param {Tx} tx the transaction that needs estimating
   */
  estimateGas: (tx: Tx) => Promise<bigint>;
  /**
   * Returns the connected provider, if any
   */
  getProvider: () => Provider;
  /**
   * Generates a transaction signature, and appends it to the transaction
   * @param {Tx} tx the transaction to be signed
   * @param {(messages: Any[]) => any[]} decodeTxMessages tx message decode callback
   * that should expand the concrete message fields into an object. Required because
   * the transaction sign bytes are generated using sorted JSON, which requires
   * encoded message values to be decoded for sorting
   */
  signTransaction: (tx: Tx, decodeTxMessages: (messages: Any[]) => unknown[], opts?: SignTransactionOptions) => Promise<Tx>;
  /**
   * Encodes and sends the transaction. If the type of endpoint
   * is a broadcast commit, waits for the transaction to be committed to the chain.
   * The transaction needs to be signed beforehand.
   * Returns the transaction hash (base-64)
   * @param {Tx} tx the signed transaction
   * @param {BroadcastType} endpoint the transaction broadcast type (sync / commit)
   */
  sendTransaction<K extends keyof BroadcastTransactionMap>(tx: Tx, endpoint: K): Promise<BroadcastTransactionMap[K]["result"]>;
  /**
   * Returns the associated signer
   */
  getSigner: () => Signer;
}
//#endregion
export { SignTransactionOptions, Wallet };
//# sourceMappingURL=wallet.d.mts.map