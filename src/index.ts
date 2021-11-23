import {World} from "./World";

const world = new World();
const liveCellCoordinates = [
    "1_1", "1_2", "2_1", "2_2", "3_3", "3_4", "4_3", "4_4"
];
world.setLivingCoordinateList(liveCellCoordinates);
console.log(world.displayResult())

const newWorld = world.tick();
console.log(newWorld.displayResult());

const newNewWorld = newWorld.tick();
console.log(newNewWorld.displayResult());

const newNewNewWorld = newNewWorld.tick();
console.log(newNewNewWorld.displayResult());
