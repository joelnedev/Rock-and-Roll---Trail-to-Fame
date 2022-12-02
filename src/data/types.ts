export interface Item {
	name: string;
	cost: number;
	description: string;
	type: "guitar" | "bass" | "drums" | "vocals";
	level: number;
};

export type MemberType = "vocals" | "guitar" | "bass" | "drums";

export interface Venue {
	name: string;
	cost: number;
	prompt: string;
	description: string;
	fameMin: number;
	multiplier: number;
}