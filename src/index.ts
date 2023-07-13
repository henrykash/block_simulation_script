import { blockSimulation } from "./core/blocksimulation";
import { streaming } from "./core/streaming";

const main = async () => {

    //call the blockSimulation function
    //await blockSimulation();

    await streaming();
};

main();