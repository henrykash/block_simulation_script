import { BigNumber, ethers } from "ethers";
import { config } from "../config/config";

// Create an instance of the provider
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

    // Create an empty array to store transactions
    const transactions = [];

    let blockTransactions = block.transactions;
    //loop through the transactions in the block and get the transaction details
     for (let i = 0; i < blockTransactions.length; i++) {

      //extract the transaction hash, from , gas price, gas limit
      const { hash, from, gasPrice, gasLimit, blockNumber } = blockTransactions[i];

      console.log("Transaction hash: ", hash)
      console.log("Transaction from: ", from)
      console.log("Transaction gas price: ", gasPrice)
      console.log("Transaction gas limit: ", gasLimit)
      console.log("Transaction block number: ", blockNumber)

      //push all the transaction in the block to the transactions array
      transactions.push({
        hash: hash,
        from: from,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        blockNumber: blockNumber
      });

       //get the transaction receipt ftom the transaction hash
       const receipt = await _provider.getTransaction(hash);

       console.log("Transaction receipt: ", receipt)
       
     }

     //sort the transactions in the block in descending order of gas price
      const sortedTransactions  = transactions.sort((a:any, b: any) => b.gasPrice - a.gasPrice);
      console.log("Here are the sorted transactions: ", sortedTransactions)

  } catch (error) {
    console.log("Error in blockSimulation: ", error);
  }
};
