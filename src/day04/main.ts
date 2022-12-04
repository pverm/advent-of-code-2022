import chalk from "chalk";
import { Challenge } from "../types";
import { getFileContent } from "../utils";

class Range {
    constructor(public start: number, public end: number) {}

    contains(other: Range) {
        return this.start <= other.start && this.end >= other.end;
    }

    overlaps(other: Range) {
        return this.start <= other.start && this.end >= other.start
            || this.start >= other.start && this.start <= other.end;
    }
}

function getRanges() {
    const fileContent = getFileContent(__dirname, "input.txt")!;
    return fileContent.trim().split("\n").map(parseLine);
}

function parseRange(range: string): Range {
    const [start, end] = range.split("-").map(Number);
    return new Range(start, end);
}

function parseLine(line: string): [Range, Range] {
    const [range1, range2] = line.trim().split(",");
    return [parseRange(range1), parseRange(range2)];
}

function countFullyContained(ranges: [Range, Range][]) {
    return ranges.reduce((sum, [rangeA, rangeB]) => {
        return rangeA.contains(rangeB) || rangeB.contains(rangeA) ? sum + 1 : sum;
    }, 0);
}

function countOverlapping(ranges: [Range, Range][]) {
    return ranges.reduce((sum, [rangeA, rangeB]) => {
        return rangeA.overlaps(rangeB) ? sum + 1 : sum;
    }, 0);
}

function partOne() {
    const ranges = getRanges();
    const result = countFullyContained(ranges);
    console.log("Fully contained ranges:", result);
}

function partTwo() {
    const ranges = getRanges();
    const result = countOverlapping(ranges);
    console.log("Overlapping ranges:", result);
}

export const day4: Challenge = {
    day: 4,
    title: "Camp Cleanup",
    run: [{
            part: 1,
            run: partOne
        }, {
            part: 2,
            run: partTwo
        }
    ]
}
