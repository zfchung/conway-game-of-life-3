// Integration test

function getResultArray(output: string) {
    const outputList = output.split("\n");
    const resultString = outputList[1]
    const resultStringRemovedBracket = resultString.slice(2,-2)
    const resultStringRemovedSingleQuote = resultStringRemovedBracket.replaceAll("'","")
    const resultStringRemovedSpace = resultStringRemovedSingleQuote.replaceAll(" ","")
    return resultStringRemovedSpace.split(",");
}

describe("testing the result of Game of Life", () => {
    it("should return the shape of toad", () => {
        // Given
        // When
        const execSync = require('child_process').execSync;
        const output = execSync('yarn dev --world="1_2,2_2,3_2"', { encoding: 'utf-8' });
        const resultArray = getResultArray(output);
        // Then
        const expectedResult = ["2_1","2_2","2_3"];
        expect(resultArray).toEqual(expect.arrayContaining(expectedResult));
    })
})
