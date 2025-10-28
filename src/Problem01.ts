// TypeScript Solution for Advent Of Code Problem #1
import { promises as fs } from 'fs';

async function solveProblem() {
    const inputString = await fs.readFile("./inputs/input01.txt", "utf8");

    const { leftList, rightList } = parseInput(inputString);
    const totalDistance = calculateTotalDistance(leftList, rightList);

    console.log("Result:", totalDistance);
}

solveProblem();

function parseInput(input: string): { leftList: number[], rightList: number[] } {
    const leftList: number[] = [];
    const rightList: number[] = [];

    const lines = input.trim().split("\n");

    for (const line of lines) {
        const [left, right] = line.split(/\s+/).map(Number);
        leftList.push(left);
        rightList.push(right);
    }

    return { leftList, rightList };
}

function calculateTotalDistance(leftList: number[], rightList: number[]) {
    leftList.sort();
    rightList.sort();
    return leftList.reduce((total, _, index) => { return total += Math.abs(leftList[index] - rightList[index]) }, 0)
}

// Result: 1873376