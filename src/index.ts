import {World} from "./World";

const world = new World();

console.log(world.displayResult())

const newWorld = world.tick();
console.log(newWorld.displayResult());


