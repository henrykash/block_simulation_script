import { blockSimulation } from "./core/blocksimulation";
import { streaming } from "./core/blocksimulationwebsocket";

const main = async () => {

    //call the blockSimulation function
    await blockSimulation();

    //await streaming();
};

main();