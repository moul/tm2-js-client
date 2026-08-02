require("../../_virtual/_rolldown/runtime.cjs");
let uuid = require("uuid");
//#region src/provider/utility/requests.utility.ts
const standardVersion = "2.0";
/**
* Creates a new JSON-RPC 2.0 request
* @param {string} method the requested method
* @param {unknown[]} [params] the requested params, if any
*/
const newRequest = (method, params) => {
	return {
		id: (0, uuid.v4)(),
		jsonrpc: standardVersion,
		method,
		params
	};
};
/**
* Creates a new JSON-RPC 2.0 response
* @param {Result} result the response result, if any
* @param {RPCError} error the response error, if any
*/
const newResponse = (result, error) => {
	return {
		id: (0, uuid.v4)(),
		jsonrpc: standardVersion,
		result,
		error
	};
};
/**
* Parses the base64 encoded ABCI JSON into a concrete type
* @param {string} data the base64-encoded JSON
*/
const parseABCI = (data) => {
	const jsonData = Buffer.from(data, "base64").toString();
	const parsedData = JSON.parse(jsonData);
	if (!parsedData) throw new Error("unable to parse JSON response");
	return parsedData;
};
const parseProto = (data, decodeFn) => {
	return decodeFn(Buffer.from(data, "base64"));
};
/**
* Converts a string into base64 representation
* @param {string} str the raw string
*/
const stringToBase64 = (str) => {
	return Buffer.from(str, "utf-8").toString("base64");
};
/**
* Converts a base64 string into a Uint8Array representation
* @param {string} str the base64-encoded string
*/
const base64ToUint8Array = (str) => {
	const buffer = Buffer.from(str, "base64");
	return new Uint8Array(buffer);
};
/**
* Converts a Uint8Array into base64 representation
* @param {Uint8Array} data the Uint8Array to be encoded
*/
const uint8ArrayToBase64 = (data) => {
	return Buffer.from(data).toString("base64");
};
//#endregion
exports.base64ToUint8Array = base64ToUint8Array;
exports.newRequest = newRequest;
exports.newResponse = newResponse;
exports.parseABCI = parseABCI;
exports.parseProto = parseProto;
exports.stringToBase64 = stringToBase64;
exports.uint8ArrayToBase64 = uint8ArrayToBase64;

//# sourceMappingURL=requests.utility.cjs.map