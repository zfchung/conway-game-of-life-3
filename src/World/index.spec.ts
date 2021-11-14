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

    xit("should be not empty after adding a new cell", () => {

    })

    xit("should be able to add new cells", () => {

    })
})
