import { TransactionEndpoint } from "../endpoints.mjs";
import { ABCIResponseBase } from "./abci.mjs";

//#region src/provider/types/common.d.ts
interface NetworkInfo {
  listening: boolean;
  listeners: string[];
  n_peers: string;
  peers: string[];
}
interface Status {
  node_info: NodeInfo;
  sync_info: SyncInfo;
  validator_info: ValidatorInfo;
}
interface NodeInfo {
  version_set: VersionInfo[];
  net_address: string;
  network: string;
  software: string;
  version: string;
  channels: string;
  monkier: string;
  other: {
    tx_index: string;
    rpc_address: string;
  };
}
interface VersionInfo {
  Name: string;
  Version: string;
  Optional: boolean;
}
interface SyncInfo {
  latest_block_hash: string;
  latest_app_hash: string;
  latest_block_height: string;
  latest_block_time: string;
  catching_up: boolean;
}
interface ValidatorInfo {
  address: string;
  pub_key: PublicKey;
  voting_power: string;
}
interface PublicKey {
  type: string;
  value: string;
}
interface ConsensusParams {
  block_height: string;
  consensus_params: {
    Block: {
      MaxTxBytes: string;
      MaxDataBytes: string;
      MaxBlockBytes: string;
      MaxGas: string;
      TimeIotaMS: string;
    };
    Validator: {
      PubKeyTypeURLs: string[];
    };
  };
}
interface ConsensusState {
  round_state: {
    [key: string]: string | null | object;
    start_time: string;
    proposal_block_hash: string | null;
    locked_block_hash: string | null;
    valid_block_hash: string | null;
    height_vote_set: object;
  };
}
interface BlockInfo {
  block_meta: BlockMeta;
  block: Block;
}
interface BlockMeta {
  block_id: BlockID;
  header: BlockHeader;
}
interface Block {
  header: BlockHeader;
  data: {
    txs: string[] | null;
  };
  last_commit: {
    block_id: BlockID;
    precommits: (PrecommitInfo | null)[] | null;
  };
}
interface BlockHeader {
  version: string;
  chain_id: string;
  height: string;
  time: string;
  num_txs: string;
  total_txs: string;
  app_version: string;
  last_block_id: BlockID;
  last_commit_hash: string | null;
  data_hash: string | null;
  validators_hash: string;
  consensus_hash: string;
  app_hash: string;
  last_results_hash: string | null;
  proposer_address: string;
}
interface BlockID {
  hash: string | null;
  parts: {
    total: string;
    hash: string | null;
  };
}
interface PrecommitInfo {
  type: number;
  height: string;
  round: string;
  block_id: BlockID;
  timestamp: string;
  validator_address: string;
  validator_index: string;
  signature: string;
}
interface BlockResult {
  height: string;
  results: {
    deliver_tx: DeliverTx[] | null;
    end_block: EndBlock;
    begin_block: BeginBlock;
  };
}
interface TxResult {
  hash: string;
  index: number;
  height: string;
  tx_result: DeliverTx;
  tx: string;
}
interface DeliverTx {
  ResponseBase: ABCIResponseBase;
  GasWanted: string;
  GasUsed: string;
}
interface EndBlock {
  ResponseBase: ABCIResponseBase;
  ValidatorUpdates: string | null;
  ConsensusParams: string | null;
  Events: string | null;
}
interface BeginBlock {
  ResponseBase: ABCIResponseBase;
}
interface BroadcastTxSyncResult {
  error: {
    [key: string]: string;
  } | null;
  data: string | null;
  Log: string;
  hash: string;
}
interface BroadcastTxCommitResult {
  check_tx: DeliverTx;
  deliver_tx: DeliverTx;
  hash: string;
  height: string;
}
type BroadcastType = TransactionEndpoint.BROADCAST_TX_SYNC | TransactionEndpoint.BROADCAST_TX_COMMIT;
type BroadcastTransactionSync = {
  endpoint: TransactionEndpoint.BROADCAST_TX_SYNC;
  result: BroadcastTxSyncResult;
};
type BroadcastTransactionCommit = {
  endpoint: TransactionEndpoint.BROADCAST_TX_COMMIT;
  result: BroadcastTxCommitResult;
};
type BroadcastTransactionMap = {
  [TransactionEndpoint.BROADCAST_TX_COMMIT]: BroadcastTransactionCommit;
  [TransactionEndpoint.BROADCAST_TX_SYNC]: BroadcastTransactionSync;
};
type BroadcastAsGeneric<K extends keyof BroadcastTransactionMap = keyof BroadcastTransactionMap> = { [P in K]: BroadcastTransactionMap[P] }[K];
//#endregion
export { BeginBlock, Block, BlockHeader, BlockID, BlockInfo, BlockMeta, BlockResult, BroadcastAsGeneric, BroadcastTransactionCommit, BroadcastTransactionMap, BroadcastTransactionSync, BroadcastTxCommitResult, BroadcastTxSyncResult, BroadcastType, ConsensusParams, ConsensusState, DeliverTx, EndBlock, NetworkInfo, PrecommitInfo, Status, TxResult };
//# sourceMappingURL=common.d.mts.map