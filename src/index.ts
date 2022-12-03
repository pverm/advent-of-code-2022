import figlet from "figlet";
import { ChallengeManager } from "./challenge-manager";

const challengeManager = new ChallengeManager();
const day = Number(process.argv[2]);
const part = Number(process.argv[3]);

console.clear();
console.log(figlet.textSync("Advent of Code 2022", {font: "Santa Clara"}));

if (day && part && !isNaN(day) && !isNaN(part))
    challengeManager.runChallenge(day, part);
else
    challengeManager.select();
