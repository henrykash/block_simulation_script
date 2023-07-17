import { BigNumber, ethers } from "ethers";
import { config } from "../config/config";

// Create an instance of the Ethereum provider
const _provider = new ethers.providers.JsonRpcProvider(config.JSON_RPC_URL);

export const blockSimulation = async () => {
  try {
    // Get the latest block number
    const blockNumber = await _provider.getBlockNumber();

    // Get the latest block
    const block = await _provider.getBlockWithTransactions(blockNumber);

    if (!block) {
      return;
    }


  
  } catch (error) {
    console.log("Error in blockSimulation: ", error);
  }
};
