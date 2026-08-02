const require_messages = require("./messages.cjs");
const require_defineProperty = require("../../_virtual/_@oxc-project_runtime@0.122.0/helpers/defineProperty.cjs");
//#region src/provider/errors/errors.ts
var TM2Error = class extends Error {
	constructor(message, log) {
		super(message);
		require_defineProperty._defineProperty(this, "log", void 0);
		this.log = log;
	}
};
var InternalError = class extends TM2Error {
	constructor(log) {
		super(require_messages.InternalErrorMessage, log);
	}
};
var TxDecodeError = class extends TM2Error {
	constructor(log) {
		super(require_messages.TxDecodeErrorMessage, log);
	}
};
var InvalidSequenceError = class extends TM2Error {
	constructor(log) {
		super(require_messages.InvalidSequenceErrorMessage, log);
	}
};
var UnauthorizedError = class extends TM2Error {
	constructor(log) {
		super(require_messages.UnauthorizedErrorMessage, log);
	}
};
var InsufficientFundsError = class extends TM2Error {
	constructor(log) {
		super(require_messages.InsufficientFundsErrorMessage, log);
	}
};
var UnknownRequestError = class extends TM2Error {
	constructor(log) {
		super(require_messages.UnknownRequestErrorMessage, log);
	}
};
var InvalidAddressError = class extends TM2Error {
	constructor(log) {
		super(require_messages.InvalidAddressErrorMessage, log);
	}
};
var UnknownAddressError = class extends TM2Error {
	constructor(log) {
		super(require_messages.UnknownAddressErrorMessage, log);
	}
};
var InvalidPubKeyError = class extends TM2Error {
	constructor(log) {
		super(require_messages.InvalidPubKeyErrorMessage, log);
	}
};
var InsufficientCoinsError = class extends TM2Error {
	constructor(log) {
		super(require_messages.InsufficientCoinsErrorMessage, log);
	}
};
var InvalidCoinsError = class extends TM2Error {
	constructor(log) {
		super(require_messages.InvalidCoinsErrorMessage, log);
	}
};
var InvalidGasWantedError = class extends TM2Error {
	constructor(log) {
		super(require_messages.InvalidGasWantedErrorMessage, log);
	}
};
var OutOfGasError = class extends TM2Error {
	constructor(log) {
		super(require_messages.OutOfGasErrorMessage, log);
	}
};
var MemoTooLargeError = class extends TM2Error {
	constructor(log) {
		super(require_messages.MemoTooLargeErrorMessage, log);
	}
};
var InsufficientFeeError = class extends TM2Error {
	constructor(log) {
		super(require_messages.InsufficientFeeErrorMessage, log);
	}
};
var TooManySignaturesError = class extends TM2Error {
	constructor(log) {
		super(require_messages.TooManySignaturesErrorMessage, log);
	}
};
var NoSignaturesError = class extends TM2Error {
	constructor(log) {
		super(require_messages.NoSignaturesErrorMessage, log);
	}
};
var GasOverflowError = class extends TM2Error {
	constructor(log) {
		super(require_messages.GasOverflowErrorMessage, log);
	}
};
//#endregion
exports.GasOverflowError = GasOverflowError;
exports.InsufficientCoinsError = InsufficientCoinsError;
exports.InsufficientFeeError = InsufficientFeeError;
exports.InsufficientFundsError = InsufficientFundsError;
exports.InternalError = InternalError;
exports.InvalidAddressError = InvalidAddressError;
exports.InvalidCoinsError = InvalidCoinsError;
exports.InvalidGasWantedError = InvalidGasWantedError;
exports.InvalidPubKeyError = InvalidPubKeyError;
exports.InvalidSequenceError = InvalidSequenceError;
exports.MemoTooLargeError = MemoTooLargeError;
exports.NoSignaturesError = NoSignaturesError;
exports.OutOfGasError = OutOfGasError;
exports.TM2Error = TM2Error;
exports.TooManySignaturesError = TooManySignaturesError;
exports.TxDecodeError = TxDecodeError;
exports.UnauthorizedError = UnauthorizedError;
exports.UnknownAddressError = UnknownAddressError;
exports.UnknownRequestError = UnknownRequestError;

//# sourceMappingURL=errors.cjs.map