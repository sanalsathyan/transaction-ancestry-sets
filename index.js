import esploraService from './esplora-service.js';

const { getBlockIDByHeight, getBlockTxns, getTxnDetails } = esploraService;

const populateTxnAncestors = async (txnId, blockTxnIds, txnAncestors) => {
  const txnDetail = await getTxnDetails(txnId);
  if (txnDetail?.vin?.length && txnDetail.vin[0]?.txnId) {
    if (blockTxnIds.includes(txnDetail.vin[0].txnId)) {
      txnAncestors.push(txnDetail.vin[0].txnId);
    }
    await populateTxnAncestors(txnDetail.vin[0].txnId, blockTxnIds, txnAncestors);
  }
  console.log(`Populated ancestors of ${txnId}`);
  return 'Done';
};

const run = async () => {
  const blockId = await getBlockIDByHeight(680000);
  const txnIds = await getBlockTxns(blockId);

  const ancestorCountInBlock = [];
  for (let i = 0; i < txnIds.length; i++) {
    const ancestorTxnIds = [];
    await populateTxnAncestors(txnIds[i], txnIds, ancestorTxnIds);
    ancestorCountInBlock.push({ txnId: txnIds[i], ancestorCount: ancestorTxnIds.length });
  }

  // Sorts transaction ancestor sets in decreasing order of count and return the top ten largest ancestor sets.
  const largestAncestorSets = ancestorCountInBlock.sort((a, b) => b.ancestorCount - a.ancestorCount).slice(0, 10);
  console.log(JSON.stringify(largestAncestorSets, null, 2));
};

run();
