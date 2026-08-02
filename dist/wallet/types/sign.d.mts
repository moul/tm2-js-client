//#region src/wallet/types/sign.d.ts
/**
 * The transaction payload that is signed to generate
 * a valid transaction signature
 */
interface TxSignPayload {
  chain_id: string;
  account_number: string;
  sequence: string;
  fee: {
    gas_fee: string;
    gas_wanted: string;
  };
  msgs: any[];
  memo: string;
}
declare const Secp256k1PubKeyType = "/tm.PubKeySecp256k1";
//#endregion
export { Secp256k1PubKeyType, TxSignPayload };
//# sourceMappingURL=sign.d.mts.map