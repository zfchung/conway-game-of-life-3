import {NewCoordinate} from "../NewCoordinate";

export class World {
    public coordinateRecord: Record<string, NewCoordinate> = {};
    private liveCoordinateList: string[] = [];

    constructor() {
        this.setLivingCoordinateList();
        this.setCoordinateList();
    }

    private setCoordinateList() {
        this.coordinateRecord = NewCoordinate.getCoordinateList();
    }

    private setLivingCoordinateList() {
        this.liveCoordinateList = ["1_2", "2_2", "3_2"];
    }

    public isEmpty() {
        return true;
    }

    public tick() {
        const newWorld = new World();
        newWorld.calculateCountOfNeighbours();
        newWorld.calculateNextGeneration();
        return newWorld;
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

        const liveCoordinateRecord: Record<string, NewCoordinate> = {};
        const deadCoordinateRecord: Record<string, NewCoordinate> = Object.assign({}, this.coordinateRecord);
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
            if(count == NewCoordinate.getRow()){
                result.push(rowList);
                rowList = [];
                count = 0;
            }
        }

        return result;
    }
}
