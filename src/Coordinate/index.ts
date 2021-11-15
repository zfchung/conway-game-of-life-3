export class Coordinate {
    constructor(private coordinateX: number, private coordinateY: number) {
    }

    public getNeighbourList(): Coordinate[] {
        const neighbourCoordinateList = this.getNeighbourCoordinates();
        return neighbourCoordinateList;
    }

    private getNeighbourCoordinates(): Coordinate[] {
        const coordinateList: Coordinate[] = [];

        for (let x = (this.coordinateX - 1); x <= (this.coordinateX + 1); x++) {
            for (let y = (this.coordinateY - 1); y <= (this.coordinateY + 1); y++) {
                if (x !== this.coordinateX || y !== this.coordinateY) {
                    const neighbourCoordinate = new Coordinate(x, y);
                    coordinateList.push(neighbourCoordinate);
                }
            }
        }

        return coordinateList;
    }
}