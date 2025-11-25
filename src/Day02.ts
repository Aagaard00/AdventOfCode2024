import { promises as fs } from 'fs';

async function run() {
    const input = await fs.readFile("./inputs/input02.txt", "utf-8");
    const reports = parseInput(input);

    solveProblem01(reports);
    solveProblem02(reports);
}

run();

function parseInput(input: string): number[][] {
    return input.trim().split("\n").map(line => line.split(" ").map(Number));
}

// So, a report only counts as safe if both of the following are true:
// - The levels are either all increasing or all decreasing.
// - Any two adjacent levels differ by at least one and at most three.
function solveProblem01(reports: number[][]) {
    const count = reports.filter(report => {
        const isIncreasing = report[0] < report[1];

        for (let i = 1; i < report.length; i++) {
            const diff = report[i] - report[i - 1];
            const distance = Math.abs(diff);

            // Unsafe if distance is not at least one and at most three.
            if (distance < 1 || distance > 3) return false;

            // Unsafe if the difference is below negative for an increasing report
            if (isIncreasing && diff < 0) return false;

            // Unsage if the difference is positive for a decreasing report
            if (!isIncreasing && diff > 0) return false;
        }

        return true;
    }).length;

    // Result 01: 402
    console.log("Result 01:", count);
}

function solveProblem02(reports: number[][]) {
    const count = 0;
    console.log("Result 02:", count);
}