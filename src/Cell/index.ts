export class Cell {
    public isAlive: boolean = false;
    public countOfLivingNeighbours: number;

    constructor(isAlive: boolean) {
        this.isAlive = isAlive;
        this.countOfLivingNeighbours = 0;
3
    }

    public setCountOfLivingNeighbours(count: number) {
        this.countOfLivingNeighbours = count;
    }

    public setIsAlive(value: boolean){
        this.isAlive = value;
    }


}
