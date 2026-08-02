//#region src/provider/endpoints.ts
let CommonEndpoint = /* @__PURE__ */ function(CommonEndpoint) {
	CommonEndpoint["HEALTH"] = "health";
	CommonEndpoint["STATUS"] = "status";
	return CommonEndpoint;
}({});
let ConsensusEndpoint = /* @__PURE__ */ function(ConsensusEndpoint) {
	ConsensusEndpoint["NET_INFO"] = "net_info";
	ConsensusEndpoint["GENESIS"] = "genesis";
	ConsensusEndpoint["CONSENSUS_PARAMS"] = "consensus_params";
	ConsensusEndpoint["CONSENSUS_STATE"] = "consensus_state";
	ConsensusEndpoint["COMMIT"] = "commit";
	ConsensusEndpoint["VALIDATORS"] = "validators";
	return ConsensusEndpoint;
}({});
let BlockEndpoint = /* @__PURE__ */ function(BlockEndpoint) {
	BlockEndpoint["BLOCK"] = "block";
	BlockEndpoint["BLOCK_RESULTS"] = "block_results";
	BlockEndpoint["BLOCKCHAIN"] = "blockchain";
	return BlockEndpoint;
}({});
let TransactionEndpoint = /* @__PURE__ */ function(TransactionEndpoint) {
	TransactionEndpoint["NUM_UNCONFIRMED_TXS"] = "num_unconfirmed_txs";
	TransactionEndpoint["UNCONFIRMED_TXS"] = "unconfirmed_txs";
	TransactionEndpoint["BROADCAST_TX_ASYNC"] = "broadcast_tx_async";
	TransactionEndpoint["BROADCAST_TX_SYNC"] = "broadcast_tx_sync";
	TransactionEndpoint["BROADCAST_TX_COMMIT"] = "broadcast_tx_commit";
	TransactionEndpoint["TX"] = "tx";
	return TransactionEndpoint;
}({});
let ABCIEndpoint = /* @__PURE__ */ function(ABCIEndpoint) {
	ABCIEndpoint["ABCI_INFO"] = "abci_info";
	ABCIEndpoint["ABCI_QUERY"] = "abci_query";
	return ABCIEndpoint;
}({});
//#endregion
exports.ABCIEndpoint = ABCIEndpoint;
exports.BlockEndpoint = BlockEndpoint;
exports.CommonEndpoint = CommonEndpoint;
exports.ConsensusEndpoint = ConsensusEndpoint;
exports.TransactionEndpoint = TransactionEndpoint;

//# sourceMappingURL=endpoints.cjs.map