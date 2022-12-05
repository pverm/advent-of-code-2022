import chalk from "chalk";
import { Challenge } from "../types";
import { getFileContent } from "../utils";

type CrateStack = {
    crates: string[];
    id: number;
}

type Instruction = {
    amount: number;
    source: number;
    target: number;
}

type CraneSimulation = {
    stacks: Map<number, CrateStack>;
    instructions: Instruction[];
}

function parseInput(): CraneSimulation {
    const fileContent = getFileContent(__dirname, "input.txt")!;
    const simulation: CraneSimulation = {
        stacks: new Map(),
        instructions: []
    };

    for (let line of fileContent.trim().split("\n")) {
        if (line.startsWith("[")) {
            let stackId = 0;
            for (let i = 0; i < line.length; i += 4) {
                stackId += 1;
                const stack = simulation.stacks.get(stackId) || { crates: [], id: stackId };
                if (line[i+1] !== " ") stack.crates.unshift(line[i+1]);
                simulation.stacks.set(stackId, stack);
            }
        } else if (line.startsWith("move")) {
            const parts = line.trim().split(" ");
            simulation.instructions.push({
                amount: Number(parts[1]),
                source: Number(parts[3]),
                target: Number(parts[5])
            });
        }
    }
    return simulation;
}

function executeInstruction(simulation: CraneSimulation) {
    const instruction = simulation.instructions.shift();
    if (!instruction) {
        console.log("No instructions left to execute");
        return;
    }

    const source = simulation.stacks.get(instruction.source)!;
    const target = simulation.stacks.get(instruction.target)!;
    for (let i = 0; i < instruction.amount; i++) {
        target.crates.push(source.crates.pop()!);
    }
}

function executeInstructionMulti(simulation: CraneSimulation) {
    const instruction = simulation.instructions.shift();
    if (!instruction) {
        console.log("No instructions left to execute");
        return;
    }

    const source = simulation.stacks.get(instruction.source)!;
    const target = simulation.stacks.get(instruction.target)!;
    const toMove: string[] = [];
    for (let i = 0; i < instruction.amount; i++) {
        toMove.push(source.crates.pop()!);
    }
    target.crates.push(...toMove.reverse());
}

function runSimulation(simulation: CraneSimulation, step: (simulation: CraneSimulation) => void) {
    while (simulation.instructions.length) {
        step(simulation);
    }
}

function findTopCrates(simulation: CraneSimulation) {
    const resultCrates = []
    for (let key of [...simulation.stacks.keys()].sort((a, b) => a - b)) {
        const stack = simulation.stacks.get(key)!;
        resultCrates.push(stack.crates[stack.crates.length - 1]);
    }
    return resultCrates.join("");
}

function partOne() {
    const simulation = parseInput();
    runSimulation(simulation, executeInstruction);
    const result = findTopCrates(simulation);
    console.log("Top crates: ", result);
}

function partTwo() {
    const simulation = parseInput();
    runSimulation(simulation, executeInstructionMulti);
    const result = findTopCrates(simulation);
    console.log("Top crates: ", result);
}

export const day5: Challenge = {
    day: 5,
    title: "Supply Stacks",
    run: [{
            part: 1,
            run: partOne
        }, {
            part: 2,
            run: partTwo
        }
    ]
}
