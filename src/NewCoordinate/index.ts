export class Coordinate {
    private countOfLivingNeighbour: number = 0;
    private static row: number = 6;
    private static column: number = 6;

    constructor(private coordinateX: number, private coordinateY: number) {
    }

    public getId() {
        return this.coordinateX + "_" + this.coordinateY;
    }

    public static getCoordinateList(): Record<string, Coordinate> {
        let coordinateList: Record<string, Coordinate> = {};
        for(let i = 0 ; i < this.row; i++){
            for(let j = 0; j < this.column; j++){
                const coordinate = new Coordinate(i,j);
                coordinateList[coordinate.getId()] = coordinate;
            }
        }

        return coordinateList;
    }

    public getNeighbourCoordinateList() {
        let neighbourList = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const neighbourCoordinateX = this.coordinateX + i;
                const neighbourCoordinateY = this.coordinateY + j;
                if (
                    neighbourCoordinateX >= 0 &&
                    neighbourCoordinateY >= 0 &&
                    (neighbourCoordinateX != this.coordinateX ||
                    neighbourCoordinateY != this.coordinateY)
                ) {
                    neighbourList.push(neighbourCoordinateX + "_" + neighbourCoordinateY);
                }
            }
        }

        return neighbourList;
    }

    public setCountOfLivingNeighbours(value: number) {
        this.countOfLivingNeighbour = value;
    }

    public getCountOfLivingNeighbours() {
        return this.countOfLivingNeighbour;
    }

    public static getRow() {
        return this.row;
    }

}
