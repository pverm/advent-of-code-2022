import { expect } from "chai";
import { describe } from "mocha";
import { shapeValue } from "./main";

describe("Day 2", () => {
    describe("shapeValue", () => {
        it("should get correct value for opponent instruction", () => {
            expect(shapeValue("A")).to.equal(1);
            expect(shapeValue("B")).to.equal(2);
            expect(shapeValue("C")).to.equal(3);
        });

        it("should get correct value for player instruction", () => {
            expect(shapeValue("X")).to.equal(1);
            expect(shapeValue("Y")).to.equal(2);
            expect(shapeValue("Z")).to.equal(3);
        });
    });
});
