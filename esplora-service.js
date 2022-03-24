import fetch from "./fetch-service.js";

const baseURL = "https://blockstream.info/api";

const getBlockIDByHeight = async (startHeight) => {
    const data = await fetch(`${baseURL}/blocks/${startHeight}`);
    console.log(JSON.stringify(data, null, 2));
    return data[0].id;
};

const getBlockTxns = async (blockId) => {
    const data = await fetch(`${baseURL}/block/${blockId}/txids`)
    console.log(data.length);
    return data;
};

const getTxnInBlock = async (blockId, index) => {
    const data = fetch(`${baseURL}/block/${blockId}/txid/${index}`);
    console.log(data);
    return data;
};

export default {
    getBlockIDByHeight,
    getBlockTxns,
    getTxnInBlock
};
