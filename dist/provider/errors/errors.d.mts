//#region src/provider/errors/errors.d.ts
declare class TM2Error extends Error {
  log?: string;
  constructor(message: string, log?: string);
}
declare class InternalError extends TM2Error {
  constructor(log?: string);
}
declare class TxDecodeError extends TM2Error {
  constructor(log?: string);
}
declare class InvalidSequenceError extends TM2Error {
  constructor(log?: string);
}
declare class UnauthorizedError extends TM2Error {
  constructor(log?: string);
}
declare class InsufficientFundsError extends TM2Error {
  constructor(log?: string);
}
declare class UnknownRequestError extends TM2Error {
  constructor(log?: string);
}
declare class InvalidAddressError extends TM2Error {
  constructor(log?: string);
}
declare class UnknownAddressError extends TM2Error {
  constructor(log?: string);
}
declare class InvalidPubKeyError extends TM2Error {
  constructor(log?: string);
}
declare class InsufficientCoinsError extends TM2Error {
  constructor(log?: string);
}
declare class InvalidCoinsError extends TM2Error {
  constructor(log?: string);
}
declare class InvalidGasWantedError extends TM2Error {
  constructor(log?: string);
}
declare class OutOfGasError extends TM2Error {
  constructor(log?: string);
}
declare class MemoTooLargeError extends TM2Error {
  constructor(log?: string);
}
declare class InsufficientFeeError extends TM2Error {
  constructor(log?: string);
}
declare class TooManySignaturesError extends TM2Error {
  constructor(log?: string);
}
declare class NoSignaturesError extends TM2Error {
  constructor(log?: string);
}
declare class GasOverflowError extends TM2Error {
  constructor(log?: string);
}
//#endregion
export { GasOverflowError, InsufficientCoinsError, InsufficientFeeError, InsufficientFundsError, InternalError, InvalidAddressError, InvalidCoinsError, InvalidGasWantedError, InvalidPubKeyError, InvalidSequenceError, MemoTooLargeError, NoSignaturesError, OutOfGasError, TM2Error, TooManySignaturesError, TxDecodeError, UnauthorizedError, UnknownAddressError, UnknownRequestError };
//# sourceMappingURL=errors.d.mts.map