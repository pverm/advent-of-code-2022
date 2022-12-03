import chalk from "chalk";
import { Challenge } from "../types";
import { getFileContent } from "../utils";

type Rucksack = {
    compartmentOne: Set<string>;
    compartmentTwo: Set<string>;
    compartmentUnion: Set<string>;
}

type Group = {
    elf1: Rucksack;
    elf2: Rucksack;
    elf3: Rucksack;
}

function getRucksacks(): Rucksack[] {
    const fileContent = getFileContent(__dirname, "input.txt")!;
    return fileContent.trim().split("\n").map(line => {
        const mid = line.length / 2;
        return {
            compartmentOne: new Set(line.slice(0, mid)),
            compartmentTwo: new Set(line.slice(mid)),
            compartmentUnion: new Set(line)
        }
    });
}

export function priority(item: string) {
    const base = item.toLowerCase() === item ? "a".charCodeAt(0) - 1 : "A".charCodeAt(0) - 27;
    return item.charCodeAt(0) - base;
}

export function intersection<T>(set1: Set<T>, set2: Set<T>) {
    return new Set([...set1].filter(x => set2.has(x)));
}

function partOne() {
    const rucksacks = getRucksacks();
    const prioritySum = rucksacks.reduce((sum, {compartmentOne, compartmentTwo}) => {
        const sharedItems = intersection(compartmentOne, compartmentTwo);
        return sum + [...sharedItems.values()].reduce((a, b) => a + priority(b), 0);
    }, 0);
    console.log(`Sum of priorities: ${prioritySum}`);
}

function formGroups(rucksacks: Rucksack[]) {
    const groups: Group[] = [];
    for (let i = 0; i < rucksacks.length; i += 3) {
        groups.push({
            elf1: rucksacks[i],
            elf2: rucksacks[i+1],
            elf3: rucksacks[i+2]
        });
    }
    return groups;
}

function partTwo() {
    const rucksacks = getRucksacks();
    const groups = formGroups(rucksacks);
    const prioritySum = groups.reduce((sum, {elf1, elf2, elf3}) => {
        const badge = intersection(intersection(elf1.compartmentUnion, elf2.compartmentUnion), elf3.compartmentUnion);
        return sum + priority([...badge.values()][0]);
    }, 0);
    console.log(`Sum of priorities: ${prioritySum}`);
}

export const day3: Challenge = {
    day: 3,
    title: "Rucksack Reorganization",
    run: [{
            part: 1,
            run: partOne,
        }, {
            part: 2,
            run: partTwo,
        }
    ]
}
