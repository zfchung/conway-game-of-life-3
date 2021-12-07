import {Coordinate} from "../Coordinate";

export class World {
    private liveCoordinateRecord: Record<string, Coordinate> = {};
    private allLiveCellDeadNeighbourRecord: Record<string, Coordinate> = {};

    constructor(liveCoordinateList: string[]) {
        this.liveCoordinateRecord = World.convertCoordinateRecord(liveCoordinateList);
    }

    private static convertCoordinateRecord(liveCoordinateList: string[]) {
        const liveCoordinateRecord: Record<string, Coordinate> = {};
        for (let value of liveCoordinateList) {
            const valueArr = value.split("_");
            const row = Number(valueArr[0]);
            const column = Number(valueArr[1]);
            liveCoordinateRecord[value] = new Coordinate(row, column);
        }
        return liveCoordinateRecord;
    }

    private newCalculateCountOfNeighbours() {
        let allLiveCellNeighbourList = [];
        for (let key in this.liveCoordinateRecord) {
            const coordinate = this.liveCoordinateRecord[key];

            const neighbourCoordinateList = coordinate.getNeighbourCoordinateList();
            allLiveCellNeighbourList.push(...neighbourCoordinateList);
            const aliveNeighbourList = this.liveCoordinateList.filter(value => neighbourCoordinateList.includes(value));
            const countOfAliveNeighbours = aliveNeighbourList.length;
            coordinate.setCountOfLivingNeighbours(countOfAliveNeighbours);
        }

        let allLiveCellDeadNeighbourList: string[] = allLiveCellNeighbourList.filter(val => !this.liveCoordinateList.includes(val));

        for (let value of allLiveCellDeadNeighbourList) {
            const valueArr = value.split("_");
            const row = Number(valueArr[0]);
            const column = Number(valueArr[1]);
            this.allLiveCellDeadNeighbourRecord[value] = new Coordinate(row, column);
        }

        for (let key in this.allLiveCellDeadNeighbourRecord) {
            const coordinate = this.allLiveCellDeadNeighbourRecord[key];

            const neighbourCoordinateList = coordinate.getNeighbourCoordinateList();
            const aliveNeighbourList = this.liveCoordinateList.filter(value => neighbourCoordinateList.includes(value));
            const countOfAliveNeighbours = aliveNeighbourList.length;
            coordinate.setCountOfLivingNeighbours(countOfAliveNeighbours);
        }
    }

    private newCalculateNextGeneration() {
        const nextGenLiveCoordinateList: string[] = [];

        for (let key in this.liveCoordinateRecord) {
            const liveNeighbourCount = this.liveCoordinateRecord[key].getCountOfLivingNeighbours();
            if (liveNeighbourCount == 2 || liveNeighbourCount == 3) {
                const coordinateId = this.liveCoordinateRecord[key].getId();
                nextGenLiveCoordinateList.push(coordinateId);
            }
        }

        for (let key in this.allLiveCellDeadNeighbourRecord) {
            const liveNeighbourCount = this.allLiveCellDeadNeighbourRecord[key].getCountOfLivingNeighbours();
            if (liveNeighbourCount == 3) {
                const coordinateId = this.allLiveCellDeadNeighbourRecord[key].getId();
                nextGenLiveCoordinateList.push(coordinateId);
            }
        }

        return nextGenLiveCoordinateList;
    }

    public newTick() {
        this.newCalculateCountOfNeighbours();
        const newNextGenLiveCoordinateList = this.newCalculateNextGeneration();
        return new World(newNextGenLiveCoordinateList);
    }

    public newDisplayResult() {

        const coordinateKeys = Object.keys(this.coordinateRecord);
        const resultList: number[] = coordinateKeys.map(value => {
            let state = 0;
            if (this.liveCoordinateList.includes(value)) {
                state = 1;
            }
            return state;
        });



        let rowList: number[] = [];
        let count = 0;
        let result = [];

        for (let value of resultList) {
            rowList.push(value);
            count++;
            if (count == Coordinate.getRow()) {
                result.push(rowList);
                rowList = [];
                count = 0;
            }
        }

        return result;
    }
}
