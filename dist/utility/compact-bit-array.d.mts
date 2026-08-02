import { CompactBitArray } from "../proto/tm2/multisig.mjs";

//#region src/utility/compact-bit-array.d.ts
/**
 * Converts an amino-encoded compact bit array string to a CompactBitArray.
 * In the amino format, 'x' represents a set bit (1) and '_' represents
 * an unset bit (0). A null input produces an empty CompactBitArray.
 *
 * @example
 * compactBitArrayFromAmino("xx___") // { extra_bits_stored: 5, elems: Uint8Array([0xC0]) }
 * compactBitArrayFromAmino(null)    // { extra_bits_stored: 0, elems: Uint8Array([]) }
 */
declare function compactBitArrayFromAmino(amino: string | null): CompactBitArray;
/**
 * Converts a CompactBitArray to its amino string representation.
 * Set bits (1) become 'x' and unset bits (0) become '_'.
 * Returns null for empty bit arrays (zero length).
 *
 * @example
 * compactBitArrayToAmino({ extra_bits_stored: 5, elems: Uint8Array([0xC0]) }) // "xx___"
 * compactBitArrayToAmino({ extra_bits_stored: 0, elems: Uint8Array([]) })     // null
 */
declare function compactBitArrayToAmino(cba: CompactBitArray): string | null;
//#endregion
export { compactBitArrayFromAmino, compactBitArrayToAmino };
//# sourceMappingURL=compact-bit-array.d.mts.map