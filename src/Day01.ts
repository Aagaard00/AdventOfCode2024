// TypeScript Solution for Advent Of Code Problem #1
import { promises as fs } from 'fs';

async function run() {
    const inputString = await fs.readFile("./inputs/input01.txt", "utf8");
    const { leftList, rightList } = parseInput(inputString);

    solveProblem01(leftList, rightList);
    solveProblem02(leftList, rightList);
    solveProblem02Alt(leftList, rightList);
}

run();

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

// Pair up the smallest number in the left list with the smallest number in the right list, then the second-smallest left number with the second-smallest right number, and so on.
// Within each pair, figure out how far apart the two numbers are; you'll need to add up all of those distances.
async function solveProblem01(leftList: number[], rightList: number[]) {
    // First lets pair up the numbers just by sorting each list
    leftList.sort();
    rightList.sort();

    // Next, reduce the lists to an absolute sum of the distance between each pair
    const totalDistance = leftList.reduce((total, _, index) => { return total += Math.abs(leftList[index] - rightList[index]) }, 0)

    // Result 01: 1873376
    console.log("Result 01:", totalDistance);
}

// This time, you'll need to figure out exactly how often each number from the left list appears in the right list.
// Calculate a total similarity score by adding up each number in the left list after multiplying it by the number of times that number appears in the right list.
async function solveProblem02(leftList: number[], rightList: number[]) {
    // Lets use a map and its ability for storing unique keys with an associated value
    const frequencyMap = new Map<number, number>();

    // Make a key for each unique value in the left list
    leftList.forEach(num => frequencyMap.set(num, 0));

    // Next, increment the value at the key each time the value appears in the right list
    rightList.forEach(num => {
        const value = frequencyMap.get(num);
        if (value == undefined) return;
        frequencyMap.set(num, value + 1);
    });

    // Finally, calculate the total similarity
    let totalSimilarity = 0;
    frequencyMap.forEach((value, key, _) => {
        totalSimilarity += key * value;
    });

    // Result 02: 18997088
    console.log("Result 02:", totalSimilarity);
}

// This is an alternate solution to problem 02, it differs slightly in approach
// Unlike the solution above, this does a computation for each element in the leftList, not just the unique once
// It does however skip the initialization loop making it faster given a low number of duplicates
function solveProblem02Alt(leftList: number[], rightList: number[]) {
    const frequencyMap = new Map<number, number>();

    // Init map with a frequency count of each number in the right list
    rightList.forEach(num =>
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1)
    );

    // Reduce the left list to a total similarity based on the frequency map
    const totalSimilarity = leftList.reduce((total, num) =>
        total + (num * (frequencyMap.get(num) || 0)), 0
    );

    // Result 02 Alt: 18997088
    console.log("Result 02 Alt:", totalSimilarity);
}