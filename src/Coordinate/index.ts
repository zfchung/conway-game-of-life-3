import {Cell} from "../Cell";

export class Coordinate {
    constructor(public coordinateX: number, public coordinateY: number, public cell: Cell) {
    }

// impossible to return the # of alive cells
// it can only return the sibling coordinates

// This class is a 2D Coordinate calculation
// If we change it to 3D Coordinate, the World class wouldn't be impacted as we abstracted the calculation into Coordinate class

}