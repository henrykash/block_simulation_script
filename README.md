# block_simulation_script
- Have you ever wondered how transactions are ordered in a block when miners gets them from the mempool ? Dont worry I was also curious and this script helps us do some digging. This project is for learning purposes especially if you are exploring MEV and transactions orderig...
  
**Exploration on transaction ordering in a `BLOCK` in blockchain**
- getting all transactions on a particular block
- ordering the transaction on the basis of highest to lowest gas
- getting the `hash` of each transaction on the block and decode to extract useful information i.e token, amount, router etc

**Project Setup & Installation**
- to install dependencies run `npm install`
- to run the script use command `npm run start`
