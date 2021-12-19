// Integration test

describe("testing the result of Game of Life", () => {
    it("should return the shape of toad", () => {
        // Given
        // When
        const execSync = require('child_process').execSync;
        const output = execSync('yarn dev --world="1_2,2_2,3_2"', { encoding: 'utf-8' });
        const outputList = output.split("\n");
        const resultString = outputList[1]
        const result_2 = resultString.slice(2,-2)
        const result_3 = result_2.replaceAll("'","")
        const result_4 = result_3.replaceAll(" ","")
        const result_5 = result_4.split(",")
        // Then
        const expectedResult = ["2_1","2_2","2_3"];
        expect(result_5).toEqual(expect.arrayContaining(expectedResult));
    })
})
