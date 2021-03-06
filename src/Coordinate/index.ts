interface ICoordinate {
    getId(): string;
}

export class Coordinate implements ICoordinate {
    private countOfLivingNeighbour: number = 0;
    private static rowSize: number = 0;
    private static columnSize: number = 0;
    private readonly row: number;
    private readonly column: number;

    constructor(private coordinateId: string) {
        this.row = Coordinate.getRowFromId(coordinateId);
        this.column = Coordinate.getColumnFromId(coordinateId);
        Coordinate.updateRowSize(this.row);
        Coordinate.updateColumnSize(this.column);
    }

    public getId() {
        return this.coordinateId;
    }

    private static getRowFromId(coordinateId: string) {
        const rowAndColumn = coordinateId.split("_");
        return Number(rowAndColumn[0]);
    }

    private static getColumnFromId(coordinateId: string) {
        const rowAndColumn = coordinateId.split("_");
        return Number(rowAndColumn[1]);
    }

    public getNeighbourCoordinateList() {
        let neighbourList = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const neighbourRow = this.row + i;
                const neighbourColumn = this.column + j;
                if (
                    neighbourRow >= 0 &&
                    neighbourColumn >= 0 &&
                    (neighbourRow != this.row ||
                        neighbourColumn != this.column)
                ) {
                    neighbourList.push(neighbourRow + "_" + neighbourColumn);
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

    public static getBoardArray() {
        const resultList: number[][] = [];

        for (let i = 0; i < Coordinate.columnSize; i++) {
            const rowArr = [];
            for (let i = 0; i < Coordinate.rowSize; i++) {
                rowArr.push(0);
            }
            resultList.push(rowArr);
        }

        return resultList;
    }

    private static updateRowSize(row: number) {
        if (Coordinate.rowSize < row) {
            Coordinate.rowSize = row;
        }
    }

    private static updateColumnSize(column: number) {
        if (Coordinate.columnSize < column) {
            Coordinate.columnSize = column;
        }
    }
}
