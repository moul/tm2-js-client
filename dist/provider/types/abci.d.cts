//#region src/provider/types/abci.d.ts
interface ABCIResponse {
  response: {
    ResponseBase: ABCIResponseBase;
    Key: string | null;
    Value: string | null;
    Proof: MerkleProof | null;
    Height: string;
  };
}
interface ABCIResponseBase {
  Error: {
    [key: string]: string;
  } | null;
  Data: string | null;
  Events: string | null;
  Log: string;
  Info: string;
}
interface MerkleProof {
  ops: {
    type: string;
    key: string | null;
    data: string | null;
  }[];
}
interface ABCIAccount {
  BaseAccount: {
    address: string;
    coins: string;
    public_key: {
      "@type": string;
      value: string;
    } | null;
    account_number: string;
    sequence: string;
  };
}
declare const ABCIErrorKey = "@type";
//#endregion
export { ABCIAccount, ABCIErrorKey, ABCIResponse, ABCIResponseBase };
//# sourceMappingURL=abci.d.cts.map