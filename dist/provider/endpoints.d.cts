//#region src/provider/endpoints.d.ts
declare enum CommonEndpoint {
  HEALTH = "health",
  STATUS = "status"
}
declare enum ConsensusEndpoint {
  NET_INFO = "net_info",
  GENESIS = "genesis",
  CONSENSUS_PARAMS = "consensus_params",
  CONSENSUS_STATE = "consensus_state",
  COMMIT = "commit",
  VALIDATORS = "validators"
}
declare enum BlockEndpoint {
  BLOCK = "block",
  BLOCK_RESULTS = "block_results",
  BLOCKCHAIN = "blockchain"
}
declare enum TransactionEndpoint {
  NUM_UNCONFIRMED_TXS = "num_unconfirmed_txs",
  UNCONFIRMED_TXS = "unconfirmed_txs",
  BROADCAST_TX_ASYNC = "broadcast_tx_async",
  BROADCAST_TX_SYNC = "broadcast_tx_sync",
  BROADCAST_TX_COMMIT = "broadcast_tx_commit",
  TX = "tx"
}
declare enum ABCIEndpoint {
  ABCI_INFO = "abci_info",
  ABCI_QUERY = "abci_query"
}
//#endregion
export { ABCIEndpoint, BlockEndpoint, CommonEndpoint, ConsensusEndpoint, TransactionEndpoint };
//# sourceMappingURL=endpoints.d.cts.map