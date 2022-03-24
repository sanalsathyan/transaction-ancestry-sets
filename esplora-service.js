import fetch from './fetch-service.js';

const baseURL = 'https://blockstream.info/api';
const RESPONSE_TYPE = {
  JSON: 'json',
  TEXT: 'text'
};

const getBlockIDByHeight = async (startHeight) => {
  const data = await fetch(`${baseURL}/blocks/${startHeight}`, RESPONSE_TYPE.JSON);
  return data[0].id;
};

const getBlockTxns = async (blockId) => {
  const data = await fetch(`${baseURL}/block/${blockId}/txids`, RESPONSE_TYPE.JSON);
  return data;
};

const getTxnInBlock = async (blockId, index) => {
  const data = await fetch(`${baseURL}/block/${blockId}/txid/${index}`, RESPONSE_TYPE.TEXT);
  return data;
};

const getTxnDetails = async (txnId) => {
  const data = await fetch(`${baseURL}/tx/${txnId}`, RESPONSE_TYPE.JSON);
  return data;
};

export default {
  getBlockIDByHeight,
  getBlockTxns,
  getTxnInBlock,
  getTxnDetails
};
