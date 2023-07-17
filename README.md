# block_simulation_script
- Have you ever wondered how transactions are ordered in a block when miners gets them from the mempool ? Dont worry I was also curious and this script helps us do some digging. This project is for learning purposes especially if you are exploring MEV and transactions orderig. The project has to files:
   1. Getting a new `block` through a `JSON_RPC provider`
 
   2. Getting a block by listening to new block using `websockest provider`...
  
**Exploration on transaction ordering in a `BLOCK` in blockchain**
- Getting all transactions on a particular block
- Ordering the transactions on the basis of highest to lowest gas
- Getting the `hash` of each transaction on the block and decode to extract useful information i.e token, amount, router etc

  
**We use the provider to access the following function which returns a promise with all transactions in the block**

`provider.getBlockWithTransactions( block ) ⇒ Promise< BlockWithTransactions >source
Get the block from the network, where the result.transactions is an Array of TransactionResponse objects.`

**Project Setup & Installation**
- to install dependencies run `npm install`
- to run the script use command `npm run start`
