import {hello} from "./index";

describe("test hello() function", () => {
    it("should return string Hello World", () => {
        expect(hello()).toEqual("Hello World!")
    })
})