import { Any } from "../google/protobuf/any.cjs";
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

//#region src/proto/tm2/abci.d.ts
declare const protobufPackage = "tm2.abci";
interface ResponseDeliverTx {
  response_base?: ResponseBase | undefined;
  gas_wanted: bigint;
  gas_used: bigint;
}
interface ResponseBase {
  error?: Any | undefined;
  data: Uint8Array;
  events: Any[];
  log: string;
  info: string;
}
declare const ResponseDeliverTx: MessageFns<ResponseDeliverTx>;
declare const ResponseBase: MessageFns<ResponseBase>;
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
export { ResponseBase, ResponseDeliverTx };
//# sourceMappingURL=abci.d.cts.map