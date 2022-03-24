import esploraService from "./esplora-service.js";

const { getBlockTxns, getTxnInBlock } = esploraService;

const run = async () => {
    await getBlockTxns("000000000000000000076c036ff5119e5a5a74df77abf64203473364509f7732");
    await getTxnInBlock("000000000000000000076c036ff5119e5a5a74df77abf64203473364509f7732", 0)
};

run();