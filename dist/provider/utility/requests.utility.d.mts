import { RPCError, RPCRequest, RPCResponse } from "../types/jsonrpc.mjs";
import { BinaryReader } from "@bufbuild/protobuf/wire";

//#region src/provider/utility/requests.utility.d.ts
/**
 * Creates a new JSON-RPC 2.0 request
 * @param {string} method the requested method
 * @param {unknown[]} [params] the requested params, if any
 */
declare const newRequest: (method: string, params?: unknown[]) => RPCRequest;
/**
 * Creates a new JSON-RPC 2.0 response
 * @param {Result} result the response result, if any
 * @param {RPCError} error the response error, if any
 */
declare const newResponse: <Result>(result?: Result, error?: RPCError) => RPCResponse<Result>;
/**
 * Parses the base64 encoded ABCI JSON into a concrete type
 * @param {string} data the base64-encoded JSON
 */
declare const parseABCI: <Result>(data: string) => Result;
declare const parseProto: <T>(data: string, decodeFn: (input: BinaryReader | Uint8Array, length?: number) => T) => T;
/**
 * Converts a string into base64 representation
 * @param {string} str the raw string
 */
declare const stringToBase64: (str: string) => string;
/**
 * Converts a base64 string into a Uint8Array representation
 * @param {string} str the base64-encoded string
 */
declare const base64ToUint8Array: (str: string) => Uint8Array;
/**
 * Converts a Uint8Array into base64 representation
 * @param {Uint8Array} data the Uint8Array to be encoded
 */
declare const uint8ArrayToBase64: (data: Uint8Array) => string;
//#endregion
export { base64ToUint8Array, newRequest, newResponse, parseABCI, parseProto, stringToBase64, uint8ArrayToBase64 };
//# sourceMappingURL=requests.utility.d.mts.map