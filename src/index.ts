import {World} from "./World";
import {Coordinate} from "./Coordinate";


const world = new World();
console.log(world.displayResult());

const newWorld = world.tick();
console.log(newWorld.displayResult());

const coordinate = new Coordinate(1,1);
console.log(coordinate.getNeighbourList());