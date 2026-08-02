import { GasOverflowErrorMessage, InsufficientCoinsErrorMessage, InsufficientFeeErrorMessage, InsufficientFundsErrorMessage, InternalErrorMessage, InvalidAddressErrorMessage, InvalidCoinsErrorMessage, InvalidGasWantedErrorMessage, InvalidPubKeyErrorMessage, InvalidSequenceErrorMessage, MemoTooLargeErrorMessage, NoSignaturesErrorMessage, OutOfGasErrorMessage, TooManySignaturesErrorMessage, TxDecodeErrorMessage, UnauthorizedErrorMessage, UnknownAddressErrorMessage, UnknownRequestErrorMessage } from "./messages.mjs";
import { _defineProperty } from "../../_virtual/_@oxc-project_runtime@0.122.0/helpers/defineProperty.mjs";
//#region src/provider/errors/errors.ts
var TM2Error = class extends Error {
	constructor(message, log) {
		super(message);
		_defineProperty(this, "log", void 0);
		this.log = log;
	}
};
var InternalError = class extends TM2Error {
	constructor(log) {
		super(InternalErrorMessage, log);
	}
};
var TxDecodeError = class extends TM2Error {
	constructor(log) {
		super(TxDecodeErrorMessage, log);
	}
};
var InvalidSequenceError = class extends TM2Error {
	constructor(log) {
		super(InvalidSequenceErrorMessage, log);
	}
};
var UnauthorizedError = class extends TM2Error {
	constructor(log) {
		super(UnauthorizedErrorMessage, log);
	}
};
var InsufficientFundsError = class extends TM2Error {
	constructor(log) {
		super(InsufficientFundsErrorMessage, log);
	}
};
var UnknownRequestError = class extends TM2Error {
	constructor(log) {
		super(UnknownRequestErrorMessage, log);
	}
};
var InvalidAddressError = class extends TM2Error {
	constructor(log) {
		super(InvalidAddressErrorMessage, log);
	}
};
var UnknownAddressError = class extends TM2Error {
	constructor(log) {
		super(UnknownAddressErrorMessage, log);
	}
};
var InvalidPubKeyError = class extends TM2Error {
	constructor(log) {
		super(InvalidPubKeyErrorMessage, log);
	}
};
var InsufficientCoinsError = class extends TM2Error {
	constructor(log) {
		super(InsufficientCoinsErrorMessage, log);
	}
};
var InvalidCoinsError = class extends TM2Error {
	constructor(log) {
		super(InvalidCoinsErrorMessage, log);
	}
};
var InvalidGasWantedError = class extends TM2Error {
	constructor(log) {
		super(InvalidGasWantedErrorMessage, log);
	}
};
var OutOfGasError = class extends TM2Error {
	constructor(log) {
		super(OutOfGasErrorMessage, log);
	}
};
var MemoTooLargeError = class extends TM2Error {
	constructor(log) {
		super(MemoTooLargeErrorMessage, log);
	}
};
var InsufficientFeeError = class extends TM2Error {
	constructor(log) {
		super(InsufficientFeeErrorMessage, log);
	}
};
var TooManySignaturesError = class extends TM2Error {
	constructor(log) {
		super(TooManySignaturesErrorMessage, log);
	}
};
var NoSignaturesError = class extends TM2Error {
	constructor(log) {
		super(NoSignaturesErrorMessage, log);
	}
};
var GasOverflowError = class extends TM2Error {
	constructor(log) {
		super(GasOverflowErrorMessage, log);
	}
};
//#endregion
export { GasOverflowError, InsufficientCoinsError, InsufficientFeeError, InsufficientFundsError, InternalError, InvalidAddressError, InvalidCoinsError, InvalidGasWantedError, InvalidPubKeyError, InvalidSequenceError, MemoTooLargeError, NoSignaturesError, OutOfGasError, TM2Error, TooManySignaturesError, TxDecodeError, UnauthorizedError, UnknownAddressError, UnknownRequestError };

//# sourceMappingURL=errors.mjs.map