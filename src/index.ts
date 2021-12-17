import {World} from "./World";
const argv = require('minimist')(process.argv.slice(2));

const liveCellCoordinates = {
    blockShape: ["1_1", "1_2", "2_1", "2_2"],
    beehiveShape: ["1_2", "1_3", "2_1", "2_4", "3_2", "3_3"],
    beaconShape: ["1_1", "1_2", "2_1", "2_2", "3_3", "3_4", "4_3", "4_4"],
    blinkerShape: ["1_2", "2_2", "3_2"],
    toadShape: ["2_2", "2_3", "2_4", "3_1", "3_2", "3_3"]
};

if (argv.world) {
    const receivedShape = argv.world.split(",");
    const world = new World(receivedShape);
    const newWorld = World.tick(world);
    World.getLiveCells(newWorld);
} else {
    const world = new World(liveCellCoordinates.toadShape);
    const newWorld = World.tick(world);
    World.displayResult(newWorld);
}

