import { Any } from "../google/protobuf/any.mjs";
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
function createBasePubKeyMultisig() {
	return {
		k: 0n,
		pub_keys: []
	};
}
const PubKeyMultisig = {
	encode(message, writer = new BinaryWriter()) {
		if (message.k !== 0n) {
			if (BigInt.asUintN(64, message.k) !== message.k) throw new globalThis.Error("value provided for field message.k of type uint64 too large");
			writer.uint32(8).uint64(message.k);
		}
		for (const v of message.pub_keys) Any.encode(v, writer.uint32(18).fork()).join();
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBasePubKeyMultisig();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) break;
					message.k = reader.uint64();
					continue;
				case 2:
					if (tag !== 18) break;
					message.pub_keys.push(Any.decode(reader, reader.uint32()));
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	},
	fromJSON(object) {
		return {
			k: isSet(object.threshold) ? BigInt(object.threshold) : 0n,
			pub_keys: globalThis.Array.isArray(object?.pubkeys) ? object.pubkeys.map((e) => Any.fromJSON(e)) : []
		};
	},
	toJSON(message) {
		const obj = {};
		if (message.k !== void 0) obj.threshold = message.k.toString();
		if (message.pub_keys?.length) obj.pubkeys = message.pub_keys.map((e) => Any.toJSON(e));
		return obj;
	},
	create(base) {
		return PubKeyMultisig.fromPartial(base ?? {});
	},
	fromPartial(object) {
		const message = createBasePubKeyMultisig();
		message.k = object.k ?? 0n;
		message.pub_keys = object.pub_keys?.map((e) => Any.fromPartial(e)) || [];
		return message;
	}
};
function createBaseMultisignature() {
	return {
		bit_array: void 0,
		sigs: []
	};
}
const Multisignature = {
	encode(message, writer = new BinaryWriter()) {
		if (message.bit_array !== void 0) CompactBitArray.encode(message.bit_array, writer.uint32(10).fork()).join();
		for (const v of message.sigs) writer.uint32(18).bytes(v);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseMultisignature();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.bit_array = CompactBitArray.decode(reader, reader.uint32());
					continue;
				case 2:
					if (tag !== 18) break;
					message.sigs.push(reader.bytes());
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	},
	fromJSON(object) {
		return {
			bit_array: isSet(object.bit_array) ? CompactBitArray.fromJSON(object.bit_array) : void 0,
			sigs: globalThis.Array.isArray(object?.sigs) ? object.sigs.map((e) => bytesFromBase64(e)) : []
		};
	},
	toJSON(message) {
		const obj = {};
		if (message.bit_array !== void 0) obj.bit_array = CompactBitArray.toJSON(message.bit_array);
		if (message.sigs?.length) obj.sigs = message.sigs.map((e) => base64FromBytes(e));
		return obj;
	},
	create(base) {
		return Multisignature.fromPartial(base ?? {});
	},
	fromPartial(object) {
		const message = createBaseMultisignature();
		message.bit_array = object.bit_array !== void 0 && object.bit_array !== null ? CompactBitArray.fromPartial(object.bit_array) : void 0;
		message.sigs = object.sigs?.map((e) => e) || [];
		return message;
	}
};
function createBaseCompactBitArray() {
	return {
		extra_bits_stored: 0,
		elems: new Uint8Array(0)
	};
}
const CompactBitArray = {
	encode(message, writer = new BinaryWriter()) {
		if (message.extra_bits_stored !== 0) writer.uint32(8).uint32(message.extra_bits_stored);
		if (message.elems.length !== 0) writer.uint32(18).bytes(message.elems);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseCompactBitArray();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) break;
					message.extra_bits_stored = reader.uint32();
					continue;
				case 2:
					if (tag !== 18) break;
					message.elems = reader.bytes();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	},
	fromJSON(object) {
		return {
			extra_bits_stored: isSet(object.extra_bits) ? globalThis.Number(object.extra_bits) : 0,
			elems: isSet(object.bits) ? bytesFromBase64(object.bits) : new Uint8Array(0)
		};
	},
	toJSON(message) {
		const obj = {};
		if (message.extra_bits_stored !== void 0) obj.extra_bits = Math.round(message.extra_bits_stored);
		if (message.elems !== void 0) obj.bits = base64FromBytes(message.elems);
		return obj;
	},
	create(base) {
		return CompactBitArray.fromPartial(base ?? {});
	},
	fromPartial(object) {
		const message = createBaseCompactBitArray();
		message.extra_bits_stored = object.extra_bits_stored ?? 0;
		message.elems = object.elems ?? new Uint8Array(0);
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
export { CompactBitArray, Multisignature, PubKeyMultisig };

//# sourceMappingURL=multisig.mjs.map