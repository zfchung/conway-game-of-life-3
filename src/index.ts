import {World} from "./World";

const world = new World();

console.log(world.displayResult())
console.log(world.newCoordinateRecord);
console.log(Object.keys(world.newCoordinateRecord).length);

const newWorld = world.tick();
console.log(newWorld.newCoordinateRecord);
console.log(Object.keys(newWorld.newCoordinateRecord).length);
console.log(newWorld.displayResult());
console.log(newWorld.newDisplayResult());
//TODO: check deadcell's alive neighbour count too


//
// // I have an object that can receive key with type string and value with type Coordinate
// let coordinateList: Record<string, Coordinate> = {};
//
//
// class World {
//     setCoordinateList(){
//         const coordinate = new Coordinate(1,1);
//         coordinateList[coordinate.getId()] = coordinate;
//     }
// }
//
// class Coordinate {
//     // Your World shouldn't be impacted by # of dimensions
//     getId() {
//         return this.x + "_" + this.y;
//     }
// }
//
//
//
// // don't put a dead cell
// // still problematic cause it's dependent on # of dimension
// {
//     0: {
//     1: true,
// },
//     1: {
//
// }
// }
//
// // you have control over the id generation, concatenating would not be a big problem
// // Ideally I would receive a list of coordinate
// // The Coordinate class should know how to generate its own id, which the world does not need to worry, the world just need to use the id passed by Coordinate
// {
//     "1-1": true,
// }
