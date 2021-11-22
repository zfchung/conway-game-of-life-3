import {Cell} from "../Cell";
import {Coordinate} from "../Coordinate";
import {NewCoordinate} from "../NewCoordinate";

export class World {
    private row: number = 6;
    private column: number = 6;
    private coordinateList: any[] = [];
    private newCoordinateRecord: Record<string, NewCoordinate> = {};
    private newLiveCoordinateList: string[] = [];

    constructor() {
        this.setCoordinateList();
        this.setNewLivingCoordinateList();
        this.setNewCoordinateList();
    }

    public setCoordinateList() {
        for (let i = 0; i < this.row; i++) {
            this.coordinateList[i] = []; // lazy initialization
            for (let j = 0; j < this.column; j++) {
                this.coordinateList[i][j] = new Coordinate(i, j, new Cell(false))
            }
        }

        // Initialization of which cell is alive
        this.coordinateList[1][2].cell.setIsAlive(true);
        this.coordinateList[2][2].cell.setIsAlive(true);
        this.coordinateList[3][2].cell.setIsAlive(true);
        this.calculateCountOfLivingNeighbour();
    }

    private setNewCoordinateList() {
        this.newCoordinateRecord = NewCoordinate.getCoordinateList();
    }

    private setNewLivingCoordinateList() {
        this.newLiveCoordinateList = ["1_2", "2_2", "3_2"];
    }

    public isEmpty() {
        return true;
    }

    public tick() {
        const newWorld = new World();
        newWorld.calculateNextGeneration();
        newWorld.newCalculateCountOfNeighbours();
        newWorld.calculateNewNextGeneration();
        return newWorld;
    }

    public calculateCountOfLivingNeighbour() {
        // Get specific coordinates of siblings from Coordinate class
        // Process the count
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.column; j++) {
                let count = 0;
                for (let k = -1; k <= 1; k++) {
                    for (let l = -1; l <= 1; l++) {
                        if ((i + k) >= 0 && (j + l) >= 0 && (i + k) < this.row && (j + l) < this.column) {
                            if (this.coordinateList[i + k][j + l].cell.isAlive) {
                                count++;
                            }
                        }
                    }
                }
                if (this.coordinateList[i][j].cell.isAlive) {
                    count--;
                }
                this.coordinateList[i][j].cell.setCountOfLivingNeighbours(count);
            }
        }
    }

    private newCalculateCountOfNeighbours() {
        for (let key in this.newCoordinateRecord) {
            const coordinate = this.newCoordinateRecord[key];

            const neighbourCoordinateList = coordinate.getNeighbourCoordinateList();
            const aliveNeighbourList = this.newLiveCoordinateList.filter(value => neighbourCoordinateList.includes(value));
            const countOfAliveNeighbours = aliveNeighbourList.length;
            coordinate.setCountOfLivingNeighbours(countOfAliveNeighbours);
        }
    }

    public calculateNextGeneration() {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.column; j++) {
                if (this.coordinateList[i][j].cell.isAlive) {
                    if (this.coordinateList[i][j].cell.countOfLivingNeighbours == 2 || this.coordinateList[i][j].cell.countOfLivingNeighbours == 3) {
                        this.coordinateList[i][j].cell.setIsAlive(true);
                    } else {
                        this.coordinateList[i][j].cell.setIsAlive(false);
                    }
                } else {
                    if (this.coordinateList[i][j].cell.countOfLivingNeighbours == 3) {
                        this.coordinateList[i][j].cell.setIsAlive(true);
                    } else {
                        this.coordinateList[i][j].cell.setIsAlive(false);
                    }
                }
            }
        }
    }

    private calculateNewNextGeneration() {

        const liveCoordinateRecord: Record<string, NewCoordinate> = {};
        const deadCoordinateRecord: Record<string, NewCoordinate> = this.newCoordinateRecord;
        const newNewLiveCoordinateList: string[] = [];

        for(let value of this.newLiveCoordinateList){
            liveCoordinateRecord[value] = this.newCoordinateRecord[value];
            delete deadCoordinateRecord[value];
        }

        for(let key in liveCoordinateRecord){
            const liveNeighbourCount = liveCoordinateRecord[key].countOfLivingNeighbour;
            if (liveNeighbourCount == 2 ||liveNeighbourCount == 3) {
                const coordinateId = liveCoordinateRecord[key].getId();
                newNewLiveCoordinateList.push(coordinateId);
            }
        }

        for(let key in deadCoordinateRecord){
            const liveNeighbourCount = deadCoordinateRecord[key].countOfLivingNeighbour;
            if (liveNeighbourCount == 3) {
                const coordinateId = deadCoordinateRecord[key].getId();
                newNewLiveCoordinateList.push(coordinateId);
            }
        }

        this.newLiveCoordinateList = newNewLiveCoordinateList;
    }

    public displayResult() {
        let resultList = [];
        let rowList = [];
        let status = 0;
        let count = 0;
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.column; j++) {
                if (this.coordinateList[i][j].cell.isAlive) {
                    status = 1;
                } else status = 0;

                rowList.push(status);

                count++;

                if (count == this.row) {
                    count = 0;
                    resultList.push(rowList);
                    rowList = [];
                }
            }
        }

        return resultList;
    }
}
