import { Any } from "../google/protobuf/any.mjs";
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
//#region src/proto/tm2/tx.ts
const protobufPackage = "tm2.tx";
function createBaseTx() {
	return {
		messages: [],
		fee: void 0,
		signatures: [],
		memo: ""
	};
}
const Tx = {
	encode(message, writer = new BinaryWriter()) {
		for (const v of message.messages) Any.encode(v, writer.uint32(10).fork()).join();
		if (message.fee !== void 0) TxFee.encode(message.fee, writer.uint32(18).fork()).join();
		for (const v of message.signatures) TxSignature.encode(v, writer.uint32(26).fork()).join();
		if (message.memo !== "") writer.uint32(34).string(message.memo);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseTx();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.messages.push(Any.decode(reader, reader.uint32()));
					continue;
				case 2:
					if (tag !== 18) break;
					message.fee = TxFee.decode(reader, reader.uint32());
					continue;
				case 3:
					if (tag !== 26) break;
					message.signatures.push(TxSignature.decode(reader, reader.uint32()));
					continue;
				case 4:
					if (tag !== 34) break;
					message.memo = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	},
	fromJSON(object) {
		return {
			messages: globalThis.Array.isArray(object?.messages) ? object.messages.map((e) => Any.fromJSON(e)) : [],
			fee: isSet(object.fee) ? TxFee.fromJSON(object.fee) : void 0,
			signatures: globalThis.Array.isArray(object?.signatures) ? object.signatures.map((e) => TxSignature.fromJSON(e)) : [],
			memo: isSet(object.memo) ? globalThis.String(object.memo) : ""
		};
	},
	toJSON(message) {
		const obj = {};
		if (message.messages?.length) obj.messages = message.messages.map((e) => Any.toJSON(e));
		if (message.fee !== void 0) obj.fee = TxFee.toJSON(message.fee);
		if (message.signatures?.length) obj.signatures = message.signatures.map((e) => TxSignature.toJSON(e));
		if (message.memo !== void 0) obj.memo = message.memo;
		return obj;
	},
	create(base) {
		return Tx.fromPartial(base ?? {});
	},
	fromPartial(object) {
		const message = createBaseTx();
		message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
		message.fee = object.fee !== void 0 && object.fee !== null ? TxFee.fromPartial(object.fee) : void 0;
		message.signatures = object.signatures?.map((e) => TxSignature.fromPartial(e)) || [];
		message.memo = object.memo ?? "";
		return message;
	}
};
function createBaseTxFee() {
	return {
		gas_wanted: 0n,
		gas_fee: ""
	};
}
const TxFee = {
	encode(message, writer = new BinaryWriter()) {
		if (message.gas_wanted !== 0n) {
			if (BigInt.asIntN(64, message.gas_wanted) !== message.gas_wanted) throw new globalThis.Error("value provided for field message.gas_wanted of type sint64 too large");
			writer.uint32(8).sint64(message.gas_wanted);
		}
		if (message.gas_fee !== "") writer.uint32(18).string(message.gas_fee);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseTxFee();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 8) break;
					message.gas_wanted = reader.sint64();
					continue;
				case 2:
					if (tag !== 18) break;
					message.gas_fee = reader.string();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	},
	fromJSON(object) {
		return {
			gas_wanted: isSet(object.gas_wanted) ? BigInt(object.gas_wanted) : 0n,
			gas_fee: isSet(object.gas_fee) ? globalThis.String(object.gas_fee) : ""
		};
	},
	toJSON(message) {
		const obj = {};
		if (message.gas_wanted !== void 0) obj.gas_wanted = message.gas_wanted.toString();
		if (message.gas_fee !== void 0) obj.gas_fee = message.gas_fee;
		return obj;
	},
	create(base) {
		return TxFee.fromPartial(base ?? {});
	},
	fromPartial(object) {
		const message = createBaseTxFee();
		message.gas_wanted = object.gas_wanted ?? 0n;
		message.gas_fee = object.gas_fee ?? "";
		return message;
	}
};
function createBaseTxSignature() {
	return {
		pub_key: void 0,
		signature: new Uint8Array(0)
	};
}
const TxSignature = {
	encode(message, writer = new BinaryWriter()) {
		if (message.pub_key !== void 0) Any.encode(message.pub_key, writer.uint32(10).fork()).join();
		if (message.signature.length !== 0) writer.uint32(18).bytes(message.signature);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBaseTxSignature();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.pub_key = Any.decode(reader, reader.uint32());
					continue;
				case 2:
					if (tag !== 18) break;
					message.signature = reader.bytes();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	},
	fromJSON(object) {
		return {
			pub_key: isSet(object.pub_key) ? Any.fromJSON(object.pub_key) : void 0,
			signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0)
		};
	},
	toJSON(message) {
		const obj = {};
		if (message.pub_key !== void 0) obj.pub_key = Any.toJSON(message.pub_key);
		if (message.signature !== void 0) obj.signature = base64FromBytes(message.signature);
		return obj;
	},
	create(base) {
		return TxSignature.fromPartial(base ?? {});
	},
	fromPartial(object) {
		const message = createBaseTxSignature();
		message.pub_key = object.pub_key !== void 0 && object.pub_key !== null ? Any.fromPartial(object.pub_key) : void 0;
		message.signature = object.signature ?? new Uint8Array(0);
		return message;
	}
};
function createBasePubKeySecp256k1() {
	return { key: new Uint8Array(0) };
}
const PubKeySecp256k1 = {
	encode(message, writer = new BinaryWriter()) {
		if (message.key.length !== 0) writer.uint32(10).bytes(message.key);
		return writer;
	},
	decode(input, length) {
		const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
		const end = length === void 0 ? reader.len : reader.pos + length;
		const message = createBasePubKeySecp256k1();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					if (tag !== 10) break;
					message.key = reader.bytes();
					continue;
			}
			if ((tag & 7) === 4 || tag === 0) break;
			reader.skip(tag & 7);
		}
		return message;
	},
	fromJSON(object) {
		return { key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0) };
	},
	toJSON(message) {
		const obj = {};
		if (message.key !== void 0) obj.key = base64FromBytes(message.key);
		return obj;
	},
	create(base) {
		return PubKeySecp256k1.fromPartial(base ?? {});
	},
	fromPartial(object) {
		const message = createBasePubKeySecp256k1();
		message.key = object.key ?? new Uint8Array(0);
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
export { PubKeySecp256k1, Tx, TxFee, TxSignature, protobufPackage };

//# sourceMappingURL=tx.mjs.map