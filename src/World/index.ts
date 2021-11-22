import {Cell} from "../Cell";
import {Coordinate} from "../Coordinate";
import {NewCoordinate} from "../NewCoordinate";

export class World {
    private row: number = 6;
    private column: number = 6;
    private coordinateList: any[] = [];
    public newCoordinateRecord: Record<string, NewCoordinate> = {};
    private newLiveCoordinateList: string[] = [];

    constructor() {
        this.setNewLivingCoordinateList();
        this.setNewCoordinateList();
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
        newWorld.newCalculateCountOfNeighbours();
        newWorld.calculateNewNextGeneration();
        return newWorld;
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

    private calculateNewNextGeneration() {

        const liveCoordinateRecord: Record<string, NewCoordinate> = {};
        const deadCoordinateRecord: Record<string, NewCoordinate> = Object.assign({}, this.newCoordinateRecord);
        const newNewLiveCoordinateList: string[] = [];

        for(let value of this.newLiveCoordinateList){
            liveCoordinateRecord[value] = this.newCoordinateRecord[value];
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

        this.newLiveCoordinateList = newNewLiveCoordinateList;
    }

    public newDisplayResult() {

        const coordinateKeys = Object.keys(this.newCoordinateRecord);
        const resultList: number[] = coordinateKeys.map( value => {
            let state = 0;
            if(this.newLiveCoordinateList.includes(value)){
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
