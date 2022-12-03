import chalk from "chalk";
import inquirer, { Answers, DistinctQuestion } from "inquirer";
import { day1 } from "./day01/main";
import { day2 } from "./day02/main";
import { day3 } from "./day03/main";
import { day4 } from "./day04/main";
import { day5 } from "./day05/main";
import { day6 } from "./day06/main";
import { day7 } from "./day07/main";
import { day8 } from "./day08/main";
import { day9 } from "./day09/main";
import { day10 } from "./day10/main";
import { day11 } from "./day11/main";
import { day12 } from "./day12/main";
import { day13 } from "./day13/main";
import { day14 } from "./day14/main";
import { day15 } from "./day15/main";
import { day16 } from "./day16/main";
import { day17 } from "./day17/main";
import { day18 } from "./day18/main";
import { day19 } from "./day19/main";
import { day20 } from "./day20/main";
import { day21 } from "./day21/main";
import { day22 } from "./day22/main";
import { day23 } from "./day23/main";
import { day24 } from "./day24/main";
import { day25 } from "./day25/main";
import { Challenge } from "./types";

export class ChallengeManager {
    public challenges: Map<number, Challenge> = new Map();

    constructor() {
        this.register(day1);
        this.register(day2);
        this.register(day3);
        this.register(day4);
        this.register(day5);
        this.register(day6);
        this.register(day7);
        this.register(day8);
        this.register(day9);
        this.register(day10);
        this.register(day11);
        this.register(day12);
        this.register(day13);
        this.register(day14);
        this.register(day15);
        this.register(day16);
        this.register(day17);
        this.register(day18);
        this.register(day19);
        this.register(day20);
        this.register(day21);
        this.register(day22);
        this.register(day23);
        this.register(day24);
        this.register(day25);
    }

    private register(challenge: Challenge) {
        this.challenges.set(challenge.day, challenge);
    }

    public runChallenge(day: number, part: number) {
        const challenge = this.challenges.get(day);
        if (!challenge) {
            console.log(chalk.red(`Challenge for day ${day} is not registered yet.`));
            return;
        }

        const challengePart = challenge?.run.find(challengePart => challengePart.part === part);
        if (!challengePart) {
            console.log(chalk.yellow(`Part ${part} of day ${day} is not registered yet.`));
            return;
        }

        const titleDisplay = challenge.title ? ` | ${challenge.title} ` : "";
        console.log(chalk.blueBright(`Running code: Day ${day} | Part ${part}${titleDisplay}`));
        challengePart.run();
    }

    public select() {
        const dayQuestion: DistinctQuestion = {
            message: "Which challenge do you want to execute?",
            name: "day",
            type: "list",
            choices: [...this.challenges.values()]
                .sort((a, b) => a.day - b.day)
                .map(challenge => ({
                    name: `Day ${challenge.day}: ${challenge.title || "Untitled"}`,
                    value: challenge.day
                }))
        }
        const partQuestion: DistinctQuestion = {
            message: "Which part of the challenge do you want to execute?",
            name: "part",
            type: "list",
            choices: (answers) => (this.challenges.get(answers["day"])?.run || [])
                .sort((a, b) => a.part - b.part)
                .map(challengePart => ({
                    name: `Part ${challengePart.part}`,
                    value: challengePart.part
                }))
        }

        inquirer.prompt([dayQuestion, partQuestion]).then((answers: Answers) => {
            this.runChallenge(answers["day"], answers["part"]);
        }).catch(err => {
            console.log(chalk.red("Experienced error when selecting a challenge to execute"));
        });
    }
}
