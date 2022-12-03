import chalk from "chalk";
import { Challenge } from "../types";
import { getFileContent } from "../utils";

function getBlockSums() {
    const fileContent = getFileContent(__dirname, "input.txt")!;
    const blocks = fileContent.split("\n\n");
    return blocks.map(block => block.trim().split("\n").map(Number).reduce((a, b) => a + b, 0));
}

function partOne() {
    const sums = getBlockSums();
    console.log(Math.max(...sums));
}

function partTwo() {
    const sums = getBlockSums().sort((a, b) => b - a);
    console.log(sums[0] + sums[1] + sums[2]);
}

export const day1: Challenge = {
    day: 1,
    title: "Calorie Counting",
    run: [{
            part: 1,
            run: partOne,
        }, {
            part: 2,
            run: partTwo,
        }
    ]
}
