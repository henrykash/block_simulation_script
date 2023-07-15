import { ethers } from "ethers";
import { config } from "../config/config";

export const streaming = async () => {
  const _wss_provider = new ethers.providers.WebSocketProvider(config.WSS_URL);

  try {
    // Subscribe to the newBlockHeaders event
    _wss_provider.on("block", async (blockNumber) => {
      console.log("New block: ", blockNumber);

      // Get the latest block
      const block: any = await _wss_provider.getBlock(blockNumber);

      if (!block) {
        return new Error("Block not found");
      }
      // Create an empty array to store transactions
      const transactions = [];

      for (const txHash of block.transactions) {
        // Get the transaction details
        const txReceipt: any = await _wss_provider.getTransaction(txHash);

        if (!txReceipt) {
          console.log(`Transaction not found: ${txHash}`);
          continue;
        }

        // Check if gasPrice is present
        if (!txReceipt.gasPrice) {
          console.log(`Gas price not found for transaction: ${txHash}`);
          return;
        }

        // Get the transaction receipt
        const txReceiptWithGas = await _wss_provider.getTransactionReceipt(
          txHash
        );

        if (!txReceiptWithGas || !txReceiptWithGas.gasUsed) {
          console.log(`Gas used not found for transaction: ${txHash}`);
          return;
        }

        // Calculate the gas fee
        const gasPrice: any = ethers.utils.formatUnits(
          txReceipt.gasPrice,
          "gwei"
        );

        console.log("Gas price: ", gasPrice);
        const gasUsed: any = txReceiptWithGas.gasUsed;

        console.log("Gas used: ", gasUsed);
        const gasFee = ethers.utils.formatEther(gasPrice.mul(block.gasLimit));
         console.log("Gas fee: ", gasFee)

        // Push the transaction details with the gas fee to the transactions array
        transactions.push({
          hash: txReceipt.hash,
          gasFee: parseFloat(gasFee),
        });
      }

      console.log("Transactions: ", transactions);
      //}
    });
  } catch (error) {
    console.log("Error in streaming: ", error);
  }
};