import { ethers } from "ethers";
import { config } from "../config/config";

// Create an instance of the Ethereum provider
const _provider = new ethers.providers.JsonRpcProvider(config.JSON_RPC_URL);

export const blockSimulation = async () => {
  try {
    // Get the latest block number
    const blockNumber = await _provider.getBlockNumber();
    console.log("Block number: ", blockNumber);

    // Get the latest block
    const block = await _provider.getBlock(blockNumber);

    if (block) {
      console.log("Block: ", block);

      //Get the transaction receipt
      const txReceipt = await _provider.getTransaction(block.hash);

      if (txReceipt) {
        console.log("transaction reciept: ", txReceipt);
      }
    }
  } catch (error) {
    console.log("Error in blockSimulation: ", error);
  }
};
