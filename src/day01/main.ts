import chalk from "chalk";
import { Challenge } from "../types";
import { getFileContent } from "../utils";

function main() {
    const fileContent = getFileContent(__dirname, "input.txt");
}

export const day1: Challenge = {
    day: 1,
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
