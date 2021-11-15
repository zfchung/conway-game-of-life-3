export class World {
    public isEmpty() {
        return true;
    }

    public tick() {
        return new World();
    }

    public displayResult() {
        const result = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        return result;
    }
}