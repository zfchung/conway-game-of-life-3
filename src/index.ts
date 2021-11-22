import {World} from "./World";

const world = new World();

console.log(world.newDisplayResult())

const newWorld = world.tick();
console.log(newWorld.newDisplayResult());
