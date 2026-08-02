const require_errors = require("../errors/errors.cjs");
require("../errors/index.cjs");
//#region src/provider/utility/errors.utility.ts
/**
* Constructs the appropriate Tendermint2
* error based on the error ID.
* Error IDs retrieved from:
* https://github.com/gnolang/gno/blob/64f0fd0fa44021a076e1453b1767fbc914ed3b66/tm2/pkg/std/package.go#L20C1-L38
* @param {string} errorID the proto ID of the error
* @param {string} [log] the log associated with the error, if any
* @returns {TM2Error}
*/
const constructRequestError = (errorID, log) => {
	switch (errorID) {
		case "/std.InternalError": return new require_errors.InternalError(log);
		case "/std.TxDecodeError": return new require_errors.TxDecodeError(log);
		case "/std.InvalidSequenceError": return new require_errors.InvalidSequenceError(log);
		case "/std.UnauthorizedError": return new require_errors.UnauthorizedError(log);
		case "/std.InsufficientFundsError": return new require_errors.InsufficientFundsError(log);
		case "/std.UnknownRequestError": return new require_errors.UnknownRequestError(log);
		case "/std.InvalidAddressError": return new require_errors.InvalidAddressError(log);
		case "/std.UnknownAddressError": return new require_errors.UnknownAddressError(log);
		case "/std.InvalidPubKeyError": return new require_errors.InvalidPubKeyError(log);
		case "/std.InsufficientCoinsError": return new require_errors.InsufficientCoinsError(log);
		case "/std.InvalidCoinsError": return new require_errors.InvalidCoinsError(log);
		case "/std.InvalidGasWantedError": return new require_errors.InvalidGasWantedError(log);
		case "/std.OutOfGasError": return new require_errors.OutOfGasError(log);
		case "/std.MemoTooLargeError": return new require_errors.MemoTooLargeError(log);
		case "/std.InsufficientFeeError": return new require_errors.InsufficientFeeError(log);
		case "/std.TooManySignaturesError": return new require_errors.TooManySignaturesError(log);
		case "/std.NoSignaturesError": return new require_errors.NoSignaturesError(log);
		case "/std.GasOverflowError": return new require_errors.GasOverflowError(log);
		default: return new require_errors.TM2Error(`unknown error: ${errorID}`, log);
	}
};
//#endregion
exports.constructRequestError = constructRequestError;

//# sourceMappingURL=errors.utility.cjs.map