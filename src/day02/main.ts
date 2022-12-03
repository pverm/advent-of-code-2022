import chalk from "chalk";
import { Challenge } from "../types";
import { getFileContent } from "../utils";

type Guide = {
    opponent: string;
    player: string;
}

function parseInput(): Guide[] {
    const fileContent = getFileContent(__dirname, "input.txt")!;
    return fileContent?.trim().split("\n").map(line => ({opponent: line[0], player: line[2]}));
}

export function shapeValue(shape: string) {
    switch (shape) {
        case "A":
        case "X":
            return 1;
        case "B":
        case "Y":
            return 2;
        case "C":
        case "Z":
            return 3;
    }
    return 0;
}

function solve(matchResult: (guide: Guide) => number, ownShape: (guide: Guide) => number) {
    const points = parseInput().reduce((sum, guide) => {
        return sum + matchResult(guide) + ownShape(guide);
    }, 0);
    console.log(`Points: ${points}`);
}

function partOne() {
    const matchResult = (guide: Guide) => {
        const opponentVal = shapeValue(guide.opponent);
        const playerVal = shapeValue(guide.player);
        if (opponentVal === playerVal)
            return 3;
        else if (opponentVal - playerVal === 2 || opponentVal - playerVal === -1)
            return 6;
        else
            return 0;
    }

    solve(matchResult, guide => shapeValue(guide.player));
}

function partTwo() {
    const matchResult = (guide: Guide) => {
        return guide.player === "X" ? 0 : (guide.player === "Y" ? 3 : 6);
    }
    const ownShape = (guide: Guide) => {
        if (guide.player === "X") {
            return guide.opponent === "A" ? 3 : shapeValue(guide.opponent) - 1;
        } else if (guide.player === "Y") {
            return shapeValue(guide.opponent);
        } else {
            return guide.opponent === "C" ? 1 : shapeValue(guide.opponent) + 1;
        };
    }

    solve(matchResult, ownShape);
}

export const day2: Challenge = {
    day: 2,
    title: "Rock Paper Scissors",
    run: [{
            part: 1,
            run: partOne,
        }, {
            part: 2,
            run: partTwo,
        }
    ]
}
