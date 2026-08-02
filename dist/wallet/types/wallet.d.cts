//#region src/wallet/types/wallet.d.ts
interface CreateWalletOptions {
  addressPrefix?: string;
  accountIndex?: number;
}
type AccountWalletOption = Pick<CreateWalletOptions, "addressPrefix">;
//#endregion
export { AccountWalletOption, CreateWalletOptions };
//# sourceMappingURL=wallet.d.cts.map