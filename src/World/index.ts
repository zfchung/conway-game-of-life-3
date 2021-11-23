import {Coordinate} from "../Coordinate";

export class World {
    public coordinateRecord: Record<string, Coordinate> = {};
    private liveCoordinateList: string[] = [];

    constructor() {
        this.setCoordinateList();
    }

    private setCoordinateList() {
        this.coordinateRecord = Coordinate.getCoordinateList();
    }

    public setLivingCoordinateList(liveCells: string[]) {
        // this.liveCoordinateList = ["1_2", "2_2", "3_2"];
        // this.liveCoordinateList = ["1_1", "1_2", "2_1", "2_2"];
        this.liveCoordinateList = liveCells;
    }

    public isEmpty() {
        return true;
    }

    public tick() {
        const world = new World();
        world.setLivingCoordinateList(this.liveCoordinateList)
        world.calculateCountOfNeighbours();
        world.calculateNextGeneration();
        return world;
    }

    private calculateCountOfNeighbours() {
        for (let key in this.coordinateRecord) {
            const coordinate = this.coordinateRecord[key];

            const neighbourCoordinateList = coordinate.getNeighbourCoordinateList();
            const aliveNeighbourList = this.liveCoordinateList.filter(value => neighbourCoordinateList.includes(value));
            const countOfAliveNeighbours = aliveNeighbourList.length;
            coordinate.setCountOfLivingNeighbours(countOfAliveNeighbours);
        }
    }

    private calculateNextGeneration() {

        const liveCoordinateRecord: Record<string, Coordinate> = {};
        const deadCoordinateRecord: Record<string, Coordinate> = Object.assign({}, this.coordinateRecord);
        const newNewLiveCoordinateList: string[] = [];

        for(let value of this.liveCoordinateList){
            liveCoordinateRecord[value] = this.coordinateRecord[value];
            delete deadCoordinateRecord[value];
        }

        for(let key in liveCoordinateRecord){
            const liveNeighbourCount = liveCoordinateRecord[key].getCountOfLivingNeighbours();
            if (liveNeighbourCount == 2 ||liveNeighbourCount == 3) {
                const coordinateId = liveCoordinateRecord[key].getId();
                newNewLiveCoordinateList.push(coordinateId);
            }
        }

        for(let key in deadCoordinateRecord){
            const liveNeighbourCount = deadCoordinateRecord[key].getCountOfLivingNeighbours();
            if (liveNeighbourCount == 3) {
                const coordinateId = deadCoordinateRecord[key].getId();
                newNewLiveCoordinateList.push(coordinateId);
            }
        }

        this.liveCoordinateList = newNewLiveCoordinateList;
    }

    public displayResult() {

        const coordinateKeys = Object.keys(this.coordinateRecord);
        const resultList: number[] = coordinateKeys.map( value => {
            let state = 0;
            if(this.liveCoordinateList.includes(value)){
                state = 1;
            }
            return state;
        });

        let rowList: number[] = [];
        let count = 0;
        let result = [];

        for(let value of resultList){
            rowList.push(value);
            count++;
            if(count == Coordinate.getRow()){
                result.push(rowList);
                rowList = [];
                count = 0;
            }
        }

        return result;
    }
}
