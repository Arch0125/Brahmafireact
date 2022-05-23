import { COVALENT_API_KEY, COVALENT_BASE_URL, ETHERSCAN_API_KEY, ETHERSCAN_BASE_URL } from "./constants";

const axios = require("axios");
const moment = require("moment");


//API Calls
export const getAddressInfoFromEtherscan = async address => {
  const endpoint = `${ETHERSCAN_BASE_URL}?module=account&action=tokentx&address=${address}&sort=asc&apikey=${ETHERSCAN_API_KEY}`;

  const transactions = (await axios.get(endpoint))?.data?.result;
};

export const getCastVoteDetails = async(address,govaddress) => {
  const endpoint = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${ETHERSCAN_API_KEY}`;
  var votedetails = (await axios.get(endpoint))?.data?.result;
  var uservotes = [];
  const numVotes = votedetails.length;
  for(let i=0;i<numVotes;i++){
    if((votedetails[i].to)===`${govaddress}`){
      var timestamp = new Date(votedetails[i].timeStamp * 1000);
      var humandatestamp = timestamp.toLocaleString();
      var uservotedetails={
        "blockNumber":votedetails[i].blockNumber,
        "voter":votedetails[i].from,
        "timestamp":humandatestamp,
        "txhash":votedetails[i].hash,
      };
      uservotes.push(uservotedetails);
    }
  }
  return uservotes;
}

export const getHoldingTimeInfoByAddress = async (address, contractAddress) => {
  const endpoint = `${ETHERSCAN_BASE_URL}?module=account&action=tokentx&contractaddress=${contractAddress}&address=${address}&sort=asc&apikey=${ETHERSCAN_API_KEY}`;

  const transactions = (await axios.get(endpoint))?.data?.result;

  const firstTimeHeld = transactions[0].timeStamp;

  return firstTimeHeld;
};

const getTokenBalanceByAddress = async (address, contractAddress) => {
  const endpoint = `${ETHERSCAN_BASE_URL}?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`;

  const balance = (await axios.get(endpoint)).data.result;

  return balance;
};

export const getAddressInfoFromCovalent = async address => {
  const endpoint = `${COVALENT_BASE_URL}1/address/${address}/portfolio_v2/?&key=${COVALENT_API_KEY}`;

  const contractDict = {};
  const contracts = (await axios.get(endpoint))?.data?.data?.items;

  const numContracts = contracts.length;
  for (let i = 0; i < numContracts; i++) {
    const contract = contracts[i];

    const holdingsLength = contract.holdings.length;

    contractDict[contract?.contract_address] = {
      contractName: contract?.contract_name,
      contractSymbol: contract?.contract_ticker_symbol,
      firstDateHeld: contract?.holdings[holdingsLength - 1]?.timestamp,
      lastDateHeld: contract?.holdings[0]?.timestamp,
    };
  }

  return contractDict;
};

export const getAddressInfo = async address => {
  const contractsDict = await getAddressInfoFromCovalent(address);

  const numContracts = Object.keys(contractsDict).length;
  const contractAddresses = Object.keys(contractsDict);

  for (let i = 0; i < numContracts; i++) {
    const contractAddress = contractAddresses[i];

    const balance = await getTokenBalanceByAddress(address, contractAddress);

    if (parseInt(balance) > 0) {
      const firstTimeHeld = await getHoldingTimeInfoByAddress(address, contractAddress);

      const currentTimeStamp = Math.floor(new Date().valueOf() / 1000);

      console.log(currentTimeStamp, firstTimeHeld);
      console.log(currentTimeStamp - firstTimeHeld);

      const timeHeld = moment.duration(moment.unix(currentTimeStamp) - moment.unix(parseInt(firstTimeHeld)));

      contractsDict[contractAddress] = {
        ...contractsDict[contractAddress],
        firstTimeHeld,
        timeHeld,
      };
    } else {
      delete contractsDict[contractAddress];
    }
  }

  console.log(contractsDict);
};
