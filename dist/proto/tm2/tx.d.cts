import { Any } from "../google/protobuf/any.cjs";
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

//#region src/proto/tm2/tx.d.ts
declare const protobufPackage = "tm2.tx";
interface Tx {
  /** specific message types */
  messages: Any[];
  /** transaction costs (fee) */
  fee?: TxFee | undefined;
  /** the signatures for the transaction */
  signatures: TxSignature[];
  /** memo attached to the transaction */
  memo: string;
}
interface TxFee {
  /** gas limit */
  gas_wanted: bigint;
  /** gas fee details (<value><denomination>) */
  gas_fee: string;
}
interface TxSignature {
  /** public key associated with the signature */
  pub_key?: Any | undefined;
  /** the signature */
  signature: Uint8Array;
}
interface PubKeySecp256k1 {
  key: Uint8Array;
}
declare const Tx: MessageFns<Tx>;
declare const TxFee: MessageFns<TxFee>;
declare const TxSignature: MessageFns<TxSignature>;
declare const PubKeySecp256k1: MessageFns<PubKeySecp256k1>;
type Builtin = Date | Function | Uint8Array | string | number | boolean | bigint | undefined;
type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> } : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };
interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
//#endregion
export { DeepPartial, Exact, MessageFns, PubKeySecp256k1, Tx, TxFee, TxSignature, protobufPackage };
//# sourceMappingURL=tx.d.cts.map