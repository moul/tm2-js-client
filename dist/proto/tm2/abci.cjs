require("../../_virtual/_rolldown/runtime.cjs");
const require_any = require("../google/protobuf/any.cjs");
let _bufbuild_protobuf_wire = require("@bufbuild/protobuf/wire");
function createBaseResponseDeliverTx() {
	return {
		response_base: void 0,
		gas_wanted: 0n,
		gas_used: 0n
	};
}
const ResponseDeliverTx = {
	encode(message, writer = new _bufbuild_protobuf_wire.BinaryWriter()) {
		if (message.response_base !== void 0) ResponseBase.encode(message.response_base, writer.uint32(10).fork()).join();
		if (message.gas_wanted !== 0n) {
			if (BigInt.asIntN(64, message.gas_wanted) !== message.gas_wanted) throw new globalThis.Error("value provided for field message.gas_wanted of type sint64 too large");
			writer.uint32(16).sint64(message.gas_wanted);
		}
		if (message.gas_used !== 0n) {
			if (BigInt.asIntN(64, message.gas_used) !== message.gas_used) throw new globalThis.Error("value provided for field message.gas_used of type sint64 too large");
			writer.uint32(24).sint64(message.gas_used);
		}
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof _bufbuild_protobuf_wire.BinaryReader ? input : new _bufbuild_protobuf_wire.BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseResponseDeliverTx();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.response_base = ResponseBase.decode(reader, reader.uint32());
					continue;
				case 2:
					if (tag !== 16) break;
					message.gas_wanted = reader.sint64();
					continue;
				case 3:
					if (tag !== 24) break;
					message.gas_used = reader.sint64();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	},
	fromJSON(object) {
		return {
			response_base: isSet(object.ResponseBase) ? ResponseBase.fromJSON(object.ResponseBase) : void 0,
			gas_wanted: isSet(object.GasWanted) ? BigInt(object.GasWanted) : 0n,
			gas_used: isSet(object.GasUsed) ? BigInt(object.GasUsed) : 0n
		};
	},
	toJSON(message) {
		const obj = {};
		if (message.response_base !== void 0) obj.ResponseBase = ResponseBase.toJSON(message.response_base);
		if (message.gas_wanted !== void 0) obj.GasWanted = message.gas_wanted.toString();
		if (message.gas_used !== void 0) obj.GasUsed = message.gas_used.toString();
		return obj;
	},
	create(base) {
		return ResponseDeliverTx.fromPartial(base ?? {});
	},
	fromPartial(object) {
		const message = createBaseResponseDeliverTx();
		message.response_base = object.response_base !== void 0 && object.response_base !== null ? ResponseBase.fromPartial(object.response_base) : void 0;
		message.gas_wanted = object.gas_wanted ?? 0n;
		message.gas_used = object.gas_used ?? 0n;
		return message;
	}
};
function createBaseResponseBase() {
	return {
		error: void 0,
		data: new Uint8Array(0),
		events: [],
		log: "",
		info: ""
	};
}
const ResponseBase = {
	encode(message, writer = new _bufbuild_protobuf_wire.BinaryWriter()) {
		if (message.error !== void 0) require_any.Any.encode(message.error, writer.uint32(10).fork()).join();
		if (message.data.length !== 0) writer.uint32(18).bytes(message.data);
		for (const v of message.events) require_any.Any.encode(v, writer.uint32(26).fork()).join();
		if (message.log !== "") writer.uint32(34).string(message.log);
		if (message.info !== "") writer.uint32(42).string(message.info);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof _bufbuild_protobuf_wire.BinaryReader ? input : new _bufbuild_protobuf_wire.BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseResponseBase();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.error = require_any.Any.decode(reader, reader.uint32());
					continue;
				case 2:
					if (tag !== 18) break;
					message.data = reader.bytes();
					continue;
				case 3:
					if (tag !== 26) break;
					message.events.push(require_any.Any.decode(reader, reader.uint32()));
					continue;
				case 4:
					if (tag !== 34) break;
					message.log = reader.string();
					continue;
				case 5:
					if (tag !== 42) break;
					message.info = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	},
	fromJSON(object) {
		return {
			error: isSet(object.Error) ? require_any.Any.fromJSON(object.Error) : void 0,
			data: isSet(object.Data) ? bytesFromBase64(object.Data) : new Uint8Array(0),
			events: globalThis.Array.isArray(object?.Events) ? object.Events.map((e) => require_any.Any.fromJSON(e)) : [],
			log: isSet(object.Log) ? globalThis.String(object.Log) : "",
			info: isSet(object.Info) ? globalThis.String(object.Info) : ""
		};
	},
	toJSON(message) {
		const obj = {};
		if (message.error !== void 0) obj.Error = require_any.Any.toJSON(message.error);
		if (message.data !== void 0) obj.Data = base64FromBytes(message.data);
		if (message.events?.length) obj.Events = message.events.map((e) => require_any.Any.toJSON(e));
		if (message.log !== void 0) obj.Log = message.log;
		if (message.info !== void 0) obj.Info = message.info;
		return obj;
	},
	create(base) {
		return ResponseBase.fromPartial(base ?? {});
	},
	fromPartial(object) {
		const message = createBaseResponseBase();
		message.error = object.error !== void 0 && object.error !== null ? require_any.Any.fromPartial(object.error) : void 0;
		message.data = object.data ?? new Uint8Array(0);
		message.events = object.events?.map((e) => require_any.Any.fromPartial(e)) || [];
		message.log = object.log ?? "";
		message.info = object.info ?? "";
		return message;
	}
};
function bytesFromBase64(b64) {
	if (globalThis.Buffer) return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
	else {
		const bin = globalThis.atob(b64);
		const arr = new Uint8Array(bin.length);
		for (let i = 0; i < bin.length; ++i) arr[i] = bin.charCodeAt(i);
		return arr;
	}
}
function base64FromBytes(arr) {
	if (globalThis.Buffer) return globalThis.Buffer.from(arr).toString("base64");
	else {
		const bin = [];
		arr.forEach((byte) => {
			bin.push(globalThis.String.fromCharCode(byte));
		});
		return globalThis.btoa(bin.join(""));
	}
}
function isSet(value) {
	return value !== null && value !== void 0;
}
//#endregion
exports.ResponseBase = ResponseBase;
exports.ResponseDeliverTx = ResponseDeliverTx;

//# sourceMappingURL=abci.cjs.map