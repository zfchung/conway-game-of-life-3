// Integration test

function callApplication(world: string[]) {
    const worldParsed = world.join(",");
    const execSync = require('child_process').execSync;
    const output = execSync(`yarn dev --world="${worldParsed}"`, {encoding: 'utf-8'});
    return getResultArray(output);
}

function getResultArray(output: string) {
    const outputList = output.split("\n");
    const resultString = outputList[1]
    const resultStringRemovedBracket = resultString.slice(2, -2)
    const resultStringRemovedSingleQuote = resultStringRemovedBracket.replaceAll("'", "")
    const resultStringRemovedSpace = resultStringRemovedSingleQuote.replaceAll(" ", "")
    return resultStringRemovedSpace.split(",");
}

describe("testing the result of Game of Life", () => {
    it("should return the shape of blinker", () => {
        // Given
        const liveCellInput = ["1_2", "2_2", "3_2"];
        // When
        const resultArray = callApplication(liveCellInput);
        // Then
        const expectedResult = ["2_1", "2_2", "2_3"];
        expect(resultArray).toEqual(expect.arrayContaining(expectedResult));
    })
})

describe.each([
    ["blinker", ["1_2", "2_2", "3_2"], ["2_1", "2_2", "2_3"]],
    ["block", ["1_1", "1_2", "2_1", "2_2"], ["1_1", "1_2", "2_1", "2_2"]],
    ["beehive", ["1_2", "1_3", "2_1", "2_4", "3_2", "3_3"], ["1_2", "1_3", "2_1", "2_4", "3_2", "3_3"]],
    ["beacon", ["1_1", "1_2", "2_1", "2_2", "3_3", "3_4", "4_3", "4_4"], ["1_1", "1_2", "2_1", "3_4", "4_3", "4_4"]],
    ["toad", ["2_2", "2_3", "2_4", "3_1", "3_2", "3_3"], ["3_1", "2_4", "1_3", "3_4", "4_2", "2_1"]]
])('testing multiple shapes', (shapeName, liveCells, expectedResult) => {
    it(`should return the correct tick of ${shapeName}`, () => {
        // Given
        // When
        const resultArray = callApplication(liveCells);
        // Then
        expect(resultArray).toEqual(expect.arrayContaining(expectedResult));
    });
});
