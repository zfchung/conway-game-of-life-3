import {World} from "./index";

describe("Test World class", () => {
    it("should be empty when initialized", () => {
        // Given
        // When
        const world = new World();
        // Then
        expect(world.isEmpty()).toBe(true);
    });

    it("should stays empty after a tick", () => {
        // Given
        const world = new World();
        expect(world.isEmpty()).toBe(true);
        // When
        const newWorld = world.tick();
        // Then
        expect(newWorld).not.toBe(world);
        expect(newWorld.isEmpty()).toBe(true);

        // Note: Understand the difference of toBe, toEqual, toStrictEqual
    });

    it("should be able to add new cells", () => {

    })

    xit("should be not empty after adding a new cell", () => {
        // Given
        const world = new World();
        // When

        // Then
    })

    it("should return matrix of the empty World", () => {
        // Given
        const world = new World();
        // When
        // TODO: Replace this with a empty() method
        expect(world.isEmpty()).toBe(true);
        const expectedResult = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        // Then
        expect(world.displayResult()).toEqual(expectedResult);
    })
})
