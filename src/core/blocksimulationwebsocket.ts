import { ethers } from "ethers";
import { config } from "../config/config";

export const streaming = async () => {
  const _wss_provider = new ethers.providers.WebSocketProvider(config.WSS_URL);

  try {
    // Subscribe to the newBlockHeaders event
    _wss_provider.on("block", async (blockNumber) => {
      
      // Get the transactions in the block
      const block: any = await _wss_provider.getBlockWithTransactions(blockNumber);

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
         const receipt = await _wss_provider.getTransaction(hash);

         console.log("Transaction receipt: ", receipt)
         
       }

       //sort the transactions in the block in descending order of gas price
        const sortedTransactions = transactions.sort((a, b) => b.gasPrice - a.gasPrice);
       // console.log("Here are the sorted transactions: ", sortedTransactions)
      
    });
  } catch (error) {
    console.log("Error in streaming: ", error);
  }
};
