import { constants, ethers, providers, utils } from "ethers";
import { config } from "../config/config";
import { PANCAKESWAP_ABI } from "../constants/abi";

//create an interface of the pancake swap router abi
let _pancakeSwap = new ethers.utils.Interface(PANCAKESWAP_ABI);

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

        // console.log("Transaction hash: ", hash)
        // console.log("Transaction from: ", from)
        // console.log("Transaction gas price: ", gasPrice)
        // console.log("Transaction gas limit: ", gasLimit)
        // console.log("Transaction block number: ", blockNumber)

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

         //decode the transaction data: call the decodeData function
         receipt?.hash &&  await decodeData(receipt);

         
       }

       //SORT the block transactions in the block in descending order of GAS PRICE
        const sortedTransactions = transactions.sort((a, b) => b.gasPrice - a.gasPrice);
        console.log("Here are the sorted transactions: ", sortedTransactions)
      
    });
  } catch (error) {
    console.log("Error in streaming: ", error);
  }
};

export const decodeData = async(receipt:   providers.TransactionResponse) => {

  //implemenation of transaction processing logic goes here
  let {
    value: targetAmountInWei,
    gasPrice: targetGasPriceInWei,
    gasLimit: targetGasLimit,
    to: router,
    from: targetFrom,
    hash: targetHash,
  } = receipt;

   //check if transaction is from a specific router i.e pancakeswap router
   if (router?.toLowerCase() === config.PANCAKESWAP_ROUTER.toLowerCase()) {

    try {

     //decode the transaction data
      let tx = _pancakeSwap.parseTransaction({
        data: receipt.data,
      });

      let { name: targetMethodName, args: targetArgs } = tx;

      let targetGasFeeInBNB = utils.formatEther(
        targetGasLimit.mul(targetGasPriceInWei || constants.Zero)
      );


      let { path, amountOutMin: targetAmountOutMin } = targetArgs;

      //if the path is undefined stop execution and return
      if (!path) return;

      let targetFromToken = path[0];
      let targetToToken = path[path.length - 1];
     
      console.info({
        targetFromToken,
        targetToToken,
        targetAmountInWei,
        targetGasPriceInWei,
        targetGasLimit,
        targetGasFeeInBNB,
        targetAmountOutMin,
        targetMethodName,
        targetFrom,
        targetHash,
      })
    
    } catch (error) {
      console.log("Error in decodeData: ", error)
    }
      
   }
  
}
