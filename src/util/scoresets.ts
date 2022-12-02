import { shuffle } from "./functions.js";

// This block of code is used to generate the sets of possible scores when performing a concert:
// Extra possibilities of low scores are added to the hard difficulty, while extra possibilities of high scores are added to easy difficulty. Normal difficulty has no extra possibilities.


const scoresets: [ number[], number[], number[] ] = [
	// Easy
	[],
	// Normal
	[],
	// Hard
	[]
];

// Generate the base scores
for (let i = 1; i <= 100; i++) {
	scoresets[0].push(i);
	scoresets[1].push(i);
	scoresets[2].push(i);
};
// Add extra mid-high scores (completely random aint too fun!)
for (let i = 65; i <= 85; i++) {
	scoresets[0].push(i);
    scoresets[0].push(i);
    scoresets[0].push(i);
    scoresets[0].push(i);
    scoresets[0].push(i);

    scoresets[1].push(i);
    scoresets[1].push(i);
    scoresets[1].push(i);
    scoresets[1].push(i);
	scoresets[1].push(i);

    scoresets[2].push(i);
    scoresets[2].push(i);
    scoresets[2].push(i);
	scoresets[2].push(i);
    scoresets[2].push(i);
};
// Add extra high scores to easy difficulty
for (let i = 75; i <= 100; i++) {
	scoresets[0].push(i);
	scoresets[0].push(i);
	scoresets[0].push(i);
	scoresets[0].push(i);
	scoresets[0].push(i);
};
// Add extra low scores to hard difficulty
for (let i = 1; i <= 25; i++) {
	scoresets[2].push(i);
	scoresets[2].push(i);
	scoresets[2].push(i);
	scoresets[2].push(i);
	scoresets[2].push(i);
};

// Shuffle the scoresets
scoresets.forEach((set, index) => (scoresets[index] = shuffle(set)));
export default scoresets;
