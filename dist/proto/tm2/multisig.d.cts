import { Any } from "../google/protobuf/any.cjs";
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

//#region src/proto/tm2/multisig.d.ts
declare const protobufPackage = "tm";
/** messages */
interface PubKeyMultisig {
  k: bigint;
  pub_keys: Any[];
}
interface Multisignature {
  bit_array?: CompactBitArray | undefined;
  sigs: Uint8Array[];
}
interface CompactBitArray {
  /** The number of extra bits in elems. */
  extra_bits_stored: number;
  elems: Uint8Array;
}
declare const PubKeyMultisig: MessageFns<PubKeyMultisig>;
declare const Multisignature: MessageFns<Multisignature>;
declare const CompactBitArray: MessageFns<CompactBitArray>;
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
export { CompactBitArray, Multisignature, PubKeyMultisig };
//# sourceMappingURL=multisig.d.cts.map