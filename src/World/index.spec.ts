import {World} from "./index";

describe("Test World class", () => {
    it("should be empty when initialized", () => {
        // Given
        // When
        const world = new World();
        // Then
        expect(world.isEmpty()).toBe(true);
    });

    xdescribe("Test World.empty() method", () => {
        it("should return empty world", () => {

        })
    })

    xit("should stays empty after a tick", () => {

    });

    xit("should be not empty after adding a new cell", () => {

    })

    xit("should be able to add new cells", () => {

    })
})
