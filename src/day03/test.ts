import { expect } from "chai";
import { describe } from "mocha";
import { intersection, priority } from "./main";

describe("Day 3", () => {
    describe("priority", () => {
        it("should calculate correct priority for lower case letters", () => {
            expect(priority("a")).to.equal(1);
            expect(priority("z")).to.equal(26);
        });

        it("should calculate correct priority for upper case letters", () => {
            expect(priority("A")).to.equal(27);
            expect(priority("Z")).to.equal(52);
        });
    });

    describe("intersection", () => {
        it("should return empty set for two empty sets", () => {
            expect(intersection(new Set(), new Set()).size).to.equal(0);
        });

        it("should return empty set for two disjoint sets", () => {
            expect(intersection(new Set([1, 2, 3]), new Set([4, 5, 6])).size).to.equal(0);
        });

        it("should return same set for intersection of set with itself", () => {
            const set = new Set([1, 2, 3]);
            expect(intersection(set, set).size).to.equal(3);
        });

        it("should return only items contained in both sets", () => {
            const set1 = new Set([1, 2, 3]);
            const set2 = new Set([3, 4, 5]);
            expect(intersection(set1, set2).size).to.equal(1);
        });
    });
});
