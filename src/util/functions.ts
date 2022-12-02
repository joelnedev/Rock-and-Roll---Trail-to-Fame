import type Band from "./band";

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param {any[]} array The array to be shuffled
 * @return {any[]} The shuffled array
 */
export const shuffle = (array: any[]): any[] => {
	let currentIndex = array.length;
	let randomIndex: number;

	// While there are still elements to shuffle
	while (currentIndex != 0) {

		// Pick a remaining element
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// Swap it with the current element
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
};

/**
 * Generate a random integer
 * @param {number} min The minimum value of the number
 * @param {number} max The maximum value of the number
 * @param {boolean} [integer = true] Whether the number must be a whole number
 */
export const randomNumber = (min: number, max: number, integer: boolean = true) => {
	return integer
		? (Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min))
		: (Math.random() * (max - min) + min);
};