import {Coordinate} from "../Coordinate";

export class World {
    private readonly liveCoordinateRecord: Record<string, Coordinate> = {};
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

    private calculateCountOfNeighbours() {
        let allLiveCellNeighbourList = [];
        const liveCoordinateList = Object.keys(this.liveCoordinateRecord);
        for (let key in this.liveCoordinateRecord) {
            const coordinate = this.liveCoordinateRecord[key];
            const neighbourCoordinateList = coordinate.getNeighbourCoordinateList();
            allLiveCellNeighbourList.push(...neighbourCoordinateList);
            const aliveNeighbourList = liveCoordinateList.filter(value => neighbourCoordinateList.includes(value));
            const countOfAliveNeighbours = aliveNeighbourList.length;
            coordinate.setCountOfLivingNeighbours(countOfAliveNeighbours);
        }
        let allLiveCellDeadNeighbourList: string[] = allLiveCellNeighbourList.filter(val => !liveCoordinateList.includes(val));

        for (let value of allLiveCellDeadNeighbourList) {
            const valueArr = value.split("_");
            const row = Number(valueArr[0]);
            const column = Number(valueArr[1]);
            this.allLiveCellDeadNeighbourRecord[value] = new Coordinate(row, column);
        }

        for (let key in this.allLiveCellDeadNeighbourRecord) {
            const coordinate = this.allLiveCellDeadNeighbourRecord[key];

            const neighbourCoordinateList = coordinate.getNeighbourCoordinateList();
            const aliveNeighbourList = liveCoordinateList.filter(value => neighbourCoordinateList.includes(value));
            const countOfAliveNeighbours = aliveNeighbourList.length;
            coordinate.setCountOfLivingNeighbours(countOfAliveNeighbours);
        }
    }

    private static calculateNextGeneration(liveCoordinateRecord: Record<string,Coordinate>, allLiveCellDeadNeighbourRecord: Record<string,Coordinate>) {
        const nextGenLiveCoordinateList: string[] = [];

        for (let key in liveCoordinateRecord) {
            const liveNeighbourCount = liveCoordinateRecord[key].getCountOfLivingNeighbours();
            if (liveNeighbourCount == 2 || liveNeighbourCount == 3) {
                const coordinateId = liveCoordinateRecord[key].getId();
                nextGenLiveCoordinateList.push(coordinateId);
            }
        }

        for (let key in allLiveCellDeadNeighbourRecord) {
            const liveNeighbourCount = allLiveCellDeadNeighbourRecord[key].getCountOfLivingNeighbours();
            if (liveNeighbourCount == 3) {
                const coordinateId = allLiveCellDeadNeighbourRecord[key].getId();
                nextGenLiveCoordinateList.push(coordinateId);
            }
        }

        return nextGenLiveCoordinateList;
    }

    public static tick(world: World) {
        world.calculateCountOfNeighbours();
        const nextGenLiveCoordinateList = World.calculateNextGeneration(world.liveCoordinateRecord, world.allLiveCellDeadNeighbourRecord);
        return new World(nextGenLiveCoordinateList);
    }

    public static displayResult(world: World) {
        const resultList = Coordinate.getBoardArray();
        const liveCoordinateList = Object.keys(world.liveCoordinateRecord);

        for(let coordinate of liveCoordinateList){
            const rowAndColumn = coordinate.split("_");
            const row = Number(rowAndColumn[0]);
            const column = Number(rowAndColumn[1]);
            resultList[row][column] = 1;
        }

        console.log(resultList);
    }
}
