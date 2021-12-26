// Integration test

function callApplication(world: string[]){
    const worldParsed = world.join(",");
    const execSync = require('child_process').execSync;
    const output = execSync(`yarn dev --world="${worldParsed}"`, { encoding: 'utf-8' });
    return getResultArray(output);
}

function getResultArray(output: string) {
    const outputList = output.split("\n");
    const resultString = outputList[1]
    const resultStringRemovedBracket = resultString.slice(2,-2)
    const resultStringRemovedSingleQuote = resultStringRemovedBracket.replaceAll("'","")
    const resultStringRemovedSpace = resultStringRemovedSingleQuote.replaceAll(" ","")
    return resultStringRemovedSpace.split(",");
}

describe("testing the result of Game of Life", () => {
    it("should return the shape of blinker", () => {
        // Given
        const liveCellInput = ["1_2","2_2","3_2"];
        // When
        const resultArray = callApplication(liveCellInput);
        // Then
        const expectedResult = ["2_1","2_2","2_3"];
        expect(resultArray).toEqual(expect.arrayContaining(expectedResult));
    })
})

// describe.each([
//     ["blinker", "1_2,2_2,3_2", ["2_1","2_2","2_3"]]
// ])('.add(%i, %i)', (shapeName, expectedResult) => {
//     test(`returns ${expected}`, () => {
//         // Given
//         // When
//         const execSync = require('child_process').execSync;
//         const output = execSync(`yarn dev --world=${shapeName}`, { encoding: 'utf-8' });
//         const resultArray = getResultArray(output);
//         // Then
//         expect(resultArray).toEqual(expect.arrayContaining(expectedResult));
//     });
// });
