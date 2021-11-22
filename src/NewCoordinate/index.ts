export class NewCoordinate {
    private countOfLivingNeighbour: number = 0;

    constructor(private coordinateX: number, private coordinateY: number) {
    }

    public getId() {
        return this.coordinateX + "_" + this.coordinateY;
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

}