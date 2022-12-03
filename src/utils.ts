import path from "path";
import fs from "fs";
import chalk from "chalk";

export function getFileContent(modulePath: string, fileName: string) {
    const filePath = path.resolve(modulePath, fileName);
    if (!fs.existsSync(filePath)) {
        console.log(chalk.red(`Input file ${filePath} does not exist.`));
        return;
    }

    console.log(chalk.grey(`Reading input file ${filePath}...`));
    try {
        const input = fs.readFileSync(filePath).toString();
        return input;
    } catch (err) {
        console.log(chalk.red(`Could not read input from file ${filePath}.`));
    }
}

const TEST_TEMPLATE =
`import { expect } from "chai";
import { describe } from "mocha";

describe("Day <DAY>", () => {

});
`;

const MAIN_TEMPLATE =
`import chalk from "chalk";
import { Challenge } from "../types";
import { getFileContent } from "../utils";

function main() {
    const fileContent = getFileContent(__dirname, "input.txt");
}

export const day<DAY>: Challenge = {
    day: <DAY>,
    title: "",
    run: [{
            part: 1,
            run: () => console.log(chalk.yellow("Challenge part not yet implemented")),
        }, {
            part: 2,
            run: () => console.log(chalk.yellow("Challenge part not yet implemented")),
        }
    ]
}
`;

export function setupEmptyFolders() {
    for (let day = 1; day <= 25; day++) {
        createEmptyChallengeFolder(day);
    }
}

function createEmptyChallengeFolder(day: number) {
    if (day < 1 || day > 25) return;

    const dayFolder = path.join("src", `day${("0"+day).slice(-2)}`);
    const mainFile = path.join(dayFolder, "main.ts");
    const testFile = path.join(dayFolder, "test.ts");

    if (fs.existsSync(dayFolder)) {
        console.log(chalk.yellow(`Folder for day ${day} already exists.`));
        return;
    }

    try {
        fs.mkdirSync(dayFolder);
        fs.writeFileSync(mainFile, MAIN_TEMPLATE.replace(new RegExp("<DAY>", "g"), day.toString()));
        fs.writeFileSync(testFile, TEST_TEMPLATE.replace(new RegExp("<DAY>", "g"), day.toString()));
        console.log(chalk.green(`Created challenge folder for day ${day}.`));
    } catch {
        console.log(chalk.red(`Folder for day ${day} could not be set up.`));
        return;
    }

}
