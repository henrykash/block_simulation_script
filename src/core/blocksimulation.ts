import { BigNumber, ethers } from "ethers";
import { config } from "../config/config";

// Create an instance of the Ethereum provider
const _provider = new ethers.providers.JsonRpcProvider(config.JSON_RPC_URL);

export const blockSimulation = async () => {
  try {
    // Get the latest block number
    const blockNumber = await _provider.getBlockNumber();

    // Get the latest block
    const block = await _provider.getBlock(blockNumber);

    if (block) {

      //if (txReceipt) {
      // console.log("transaction reciept: ", txReceipt);
      // Create an empty array to store transactions
      const transactions = [];
      for (const txHash of block.transactions) {
        console.log("txHash: ", txHash)
        //Get the transaction  transaction details
        const txReceipt: any = await _provider.getTransaction(txHash);
        // Simulate the transaction execution
        const simulatedTx: any = await _provider.call(txReceipt);

        console.log("We are here now", simulatedTx);

        if(simulatedTx === "0x"){
            console.log("Transaction failed")
            return
        }

        console.log("We are here now 2")

        // Calculate the gas fee
        const gasPrice = ethers.utils.formatUnits(txReceipt.gasPrice, "gwei");

        console.log("gas price: ", gasPrice)
        const gasUsed = ethers.BigNumber.from(simulatedTx.gasUsed);
        console.log("gas used: ", gasUsed)
        const gasFee = ethers.utils.formatEther(
          BigNumber.from(gasPrice).mul(gasUsed)
        );

        console.log("gas fee: ", gasFee)

        // Push the transaction details with the gas fee to the transactions array
        transactions.push({
          hash: txReceipt.hash,
          //   gasFee: parseFloat(gasFee),
        });
      }

      console.log("Transactions: ", transactions);
      //}
    }
  } catch (error) {
    console.log("Error in blockSimulation: ", error);
  }
};
