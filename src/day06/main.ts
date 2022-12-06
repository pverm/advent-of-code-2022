import chalk from "chalk";
import { Challenge } from "../types";
import { getFileContent } from "../utils";

function readStream() {
    const fileContent = getFileContent(__dirname, "input.txt")!;
    return [...fileContent.trim()];
}

function findMarker(buffer: string[], n: number) {
    const previousLetters = new Set<string>();
    let left = 0;
    let right = 0;
    while (right < buffer.length) {
        while (previousLetters.has(buffer[right])) {
            previousLetters.delete(buffer[left]);
            left += 1;
        }
        previousLetters.add(buffer[right]);
        if (previousLetters.size === n) {
            console.log(`Found marker at position ${right + 1}`);
            return;
        }
        right += 1;
    }
}

export const day6: Challenge = {
    day: 6,
    title: "Tuning Trouble",
    run: [{
            part: 1,
            run: () => findMarker(readStream(), 4)
        }, {
            part: 2,
            run: () => findMarker(readStream(), 14),
        }
    ]
}
