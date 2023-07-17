import { blockSimulation } from "./core/blocksimulation";
import { streaming } from "./core/blocksimulationwebsocket";

const main = async () => {

    //call the blockSimulation functions
   // await blockSimulation();

   await streaming();
};

main();