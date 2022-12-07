import chalk from "chalk";
import { Challenge } from "../types";
import { getFileContent } from "../utils";

interface File {
    name: string;
    size: number;
    parent: Directory;
}

class Directory {
    constructor(public name: string, public parent: Directory | null) {};
    public files: {[name: string]: File} = {};
    public directories: {[name: string]: Directory} = {};
    public size = (): number => {
        return Object.values(this.files).reduce((sum, file) => sum + file.size, 0)
            + Object.values(this.directories).reduce((sum, dir) => sum + dir.size(), 0);
    }
}

function process(lines: string[]): Directory {
    const root = new Directory("/", null);
    let currentDirectory = root;

    for (let i = 0; i < lines.length; i++) {
        const parts = lines[i].trim().split(" ");
        if (parts[0] === "$" && parts[1] === "cd") {
            const target = parts[2];
            if (target === "/") {
                currentDirectory = root;
            } else if (target === "..") {
                currentDirectory = currentDirectory.parent!;
            } else {
                const child = currentDirectory.directories[target] || new Directory(target, currentDirectory);
                currentDirectory = child;
            }
        } else if (parts[0] === "$" && parts[1] === "ls") {
            continue;
        } else if (parts[0] === "dir") {
            const target = parts[1];
            const child = currentDirectory.directories[target] || new Directory(target, currentDirectory);
            currentDirectory.directories[target] = child;
        } else {
            const size = Number(parts[0]);
            const target = parts[1];
            const child = currentDirectory.files[target] || {name: target, size, parent: currentDirectory};
            currentDirectory.files[target] = child;
        }
    }
    return root;
}

function collectDirectories(root: Directory, predicate: (dir: Directory) => boolean): Directory[] {
    return Object.values(root.directories).reduce((result, dir) => {
        return result.concat(collectDirectories(dir, predicate));
    }, predicate(root) ? [root] : []);
}

function partOne() {
    const fileContent = getFileContent(__dirname, "input.txt")!;
    const root = process(fileContent.trim().split("\n"));
    const dirs = collectDirectories(root, dir => dir.size() <= 100000);
    console.log(`Total size of all dirs of size <= 100000: ${dirs.reduce((sum, dir) => sum + dir.size(), 0)}`);
}

function partTwo() {
    const fileContent = getFileContent(__dirname, "input.txt")!;
    const root = process(fileContent.trim().split("\n"));
    const totalSpace = 70000000;
    const targetSpace = 30000000;
    const unusedSpace = totalSpace - root.size();
    const requiredToDelete = targetSpace - unusedSpace;
    const dirs = collectDirectories(root, dir => dir.size() >= requiredToDelete);
    const minDir = dirs.reduce((min, dir) => dir.size() < min.size() ? dir : min);
    console.log(`Size of the smallest directory that frees up enough space: ${minDir.size()}`);
}

export const day7: Challenge = {
    day: 7,
    title: "No Space Left On Device",
    run: [{
            part: 1,
            run: partOne,
        }, {
            part: 2,
            run: partTwo
        }
    ]
}
