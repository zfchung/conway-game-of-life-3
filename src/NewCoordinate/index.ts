export class NewCoordinate {
    constructor(private coordinateX: number, private coordinateY: number) {

    }

    public getId(){
        return this.coordinateX + "_" + this.coordinateY;
    }

}