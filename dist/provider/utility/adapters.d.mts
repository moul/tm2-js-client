import { ABCIResponse } from "../types/abci.mjs";
import { BlockInfo, BlockResult, BroadcastTxCommitResult, BroadcastTxSyncResult, ConsensusParams, NetworkInfo, Status, TxResult } from "../types/common.mjs";
import { AbciQueryResponse, BlockResponse, BlockResultsResponse, BroadcastTxCommitResponse, BroadcastTxSyncResponse, ConsensusParamsResponse, NetInfoResponse, StatusResponse, TxResponse } from "@gnolang/tm2-rpc";

//#region src/provider/utility/adapters.d.ts
declare const toHexString: (data: Uint8Array) => string;
declare const toBase64: (data: Uint8Array) => string;
declare const adaptStatusResponse: (r: StatusResponse) => Status;
declare const adaptBlockResponse: (r: BlockResponse) => BlockInfo;
declare const adaptBlockResultsResponse: (r: BlockResultsResponse) => BlockResult;
declare const adaptNetInfoResponse: (r: NetInfoResponse) => NetworkInfo;
declare const adaptConsensusParamsResponse: (r: ConsensusParamsResponse) => ConsensusParams;
declare const adaptAbciQueryResponse: (r: AbciQueryResponse) => ABCIResponse;
declare const adaptBroadcastTxSyncResponse: (r: BroadcastTxSyncResponse) => BroadcastTxSyncResult;
declare const adaptBroadcastTxCommitResponse: (r: BroadcastTxCommitResponse) => BroadcastTxCommitResult;
declare const adaptTxResponse: (r: TxResponse) => TxResult;
//#endregion
export { adaptAbciQueryResponse, adaptBlockResponse, adaptBlockResultsResponse, adaptBroadcastTxCommitResponse, adaptBroadcastTxSyncResponse, adaptConsensusParamsResponse, adaptNetInfoResponse, adaptStatusResponse, adaptTxResponse, toBase64, toHexString };
//# sourceMappingURL=adapters.d.mts.map