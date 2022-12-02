import { randomNumber } from "./functions.js";
import items from "../data/items.js";
import scoresets from "./scoresets.js";
import skillParams from "../data/skillParams.js";
import type { Item, MemberType, Venue } from "../data/types";
import venues from "../data/venues.js";
import prompt from "./prompt.js";
import { exit } from "../index.js";
import { error, alert, info, menu } from "./chalk.js";

// Class contains all metadata and logic stuff for functions
/** 
 * Class representing the band and it's saved data 
 */
export default class Band {
	name: string;
	names: { vocals: string; guitar: string; bass: string; drums: string; };
	fame: number;
	day: number;
	money: number;
	_scoreset: number[];
	_performed: boolean;
	_upgraded: boolean;
	_lastUnlockedVenue: number;
	_isSigned: boolean;
	_labelNoDay: number;
	_upgrades: {
		vocals: number,
		guitar: number,
		bass: number,
		drums: number
	}

	/**
	 * Create a band
	 * @param {string} name The name of the band
	 * @param { { vocals: string, guitar: string, bass: string, drums: string } } names The names of each band member
	 * @param {0|1|2} [difficulty = 1] Difficulty of the game
	 */
	constructor(name: string, { vocals, guitar, bass, drums }: { vocals: string; guitar: string; bass: string; drums: string; }, difficulty: (0|1|2) = 1) {
		/**
		 * The name of the band
		 * @type {string}
		 */
		this.name = name;

		/**
		 * The names of each band member
		 * @type { { vocals: string, guitar: string, bass: string, drums: string } }
		 */
		this.names = { vocals, guitar, bass, drums };

		/**
		 * The current fame score for the band
		 * @type {number}
		 */
		this.fame = 0;

		/**
		 * How many days have passed since the band was formed
		 * @type {number}
		 */
		this.day = 0;

		/**
		 * The difficulty of the game
		 * @type {number[]}
		 */
		this._scoreset = scoresets[difficulty];

		/**
		 * How much money the band has
		 * @type {number}
		 */
		this.money = 1500;

		this._upgrades = {
			vocals: 0,
			guitar: 0,
			bass: 0,
			drums: 0
		};

		this._upgraded = false;

		this._performed = false;

		this._lastUnlockedVenue = 0;

		this._isSigned = false;

		this._labelNoDay = this.day;
	}

	/**
	 * Generate skill levels for each band member for a gig
	 * @returns { { vocals: number, guitar: number, bass: number, drums: number, final: number } } The skill levels for each band member
	 * @private
	 */
	private skillGen(): { vocals: number; guitar: number; bass: number; drums: number; final: number; } {
		const vocals = randomNumber(...(skillParams[this._upgrades.vocals]), false);
		const guitar = randomNumber(...(skillParams[this._upgrades.guitar]), false);
		const bass = randomNumber(...(skillParams[this._upgrades.bass]), false);
		const drums = randomNumber(...(skillParams[this._upgrades.drums]), false);
		return { vocals, guitar, bass, drums, final: (guitar+bass+drums+vocals)/4 };
	}

	/**
	 * Generate venue opportunities
	 * @returns {Venue[]|null} Array of venues that can be performed at, if any
	 */
	venueList(): Venue[]|null {
		const available = venues.filter(venue => venue.fameMin <= this.fame);
		if (!available.length) return null; // <- This line is never reached, but it keeps TypeScript happy
		return available;
	}

	/**
	 * Get the next possible upgrade for a band member
	 * @param {MemberType} type The band member type to get the upgrade for
	 * @returns {Item|null} The next upgrade for the band member, if any
	 */
	nextUpgrade(type: MemberType): Item|null {
		return items.find(item => item.type === type && item.level === this._upgrades[type]+1) ?? null;
	}

	/**
	 * Get the current upgrade for a band member
	 * @param {MemberType} type The band member type to get the upgrade for
	 * @returns {Item|null} The current upgrade for the band member, if any
	 */
	currentUpgrade(type: MemberType): Item|null {
		return items.find(item => item.type === type && item.level === this._upgrades[type]) ?? null;
	}

	/**
	 * Perform a show
	 * @param {Venue} venue The venue being performed at.
	 * @returns {void} The result of the show
	 */
	performShow(venue: Venue): void {
		if (this._performed) return console.log(error("You can't perform two shows in one day!\n"));
		this._performed = true;

		const score = this._scoreset[randomNumber(1, 100)];
		const skill = this.skillGen();
		const signedBonus = this._isSigned ? 1.75 : 1;
		const fameIncrease = Math.ceil(score * venue.multiplier * skill.final * signedBonus);
		const moneyIncrease = Math.ceil(score * venue.multiplier * skill.final * signedBonus * randomNumber(5, 10));
		this.fame += fameIncrease;
		this.money += moneyIncrease;

		let output = "";

		output += `\n${this.name} performed at ${venue.name}, scoring ${score}! The band earned $${moneyIncrease} and gained ${fameIncrease} fame!\n`;

		if (skill.vocals > 1.5) output += `${this.names.vocals} sang their heart out!\n`;
		if (skill.guitar > 1.5) output += `${this.names.guitar} ripped a crazy solo!\n`;
		if (skill.bass > 1.5) output += `${this.names.bass} was in the groove!\n`;
		if (skill.drums > 1.5) output += `${this.names.drums} kept up the energy!\n`;

		console.log(info(output));
	}

	/**
	 * Upgrade a band member
	 * @param {MemberType} type The band member type to upgrade
	 * @returns {void} The result of the upgrade
	 */
	upgrade(type: MemberType): void {
		if (this._upgraded) return console.log(error("You can only upgrade one band member per day!\n"));
		this._upgraded = true;

		const item = this.nextUpgrade(type);
		if (!item) return console.log(error("You can't upgrade this band member any further!\n"));
		this.money -= item.cost;
		this._upgrades[type]++;

		return console.log(info(`${this.names[item.type]} bought a ${item.name} for $${item.cost}! The band now has $${this.money}.\n`));
	}

	/**
	 * Move to the next day
	 * @returns {void} The result of the day, and prompts for the next day
	 */
	async nextDay(): Promise<void> {
		this.day++;
		this._performed = false;
		this._upgraded = false;
		console.log(info(`\nOnto the next day! It's now been ${this.day} days since ${this.name} was formed.\n` +
			`The band has $${this.money} and ${this.fame} fame.\n\n`+
			`Upgrades:\n` +
			`${this.names.vocals} (vocalist): ${this._upgrades.vocals}\n` +
			`${this.names.guitar} (guitarist): ${this._upgrades.guitar}\n` +
			`${this.names.bass} (bassist): ${this._upgrades.bass}\n` +
			`${this.names.drums} (drummer): ${this._upgrades.drums}\n` + "\n"));
		
		if (venues[this._lastUnlockedVenue+1].fameMin <= this.fame) {
			this._lastUnlockedVenue++;
			console.log(venues[this._lastUnlockedVenue].prompt + "\n");
		}
		if ((this.fame >= 1000 && !this._isSigned) && (this.day - this._labelNoDay > 30)) {
			console.log(alert("You've been approached by a record label! One of their executives saw your performance last night and wants to sign you to a contract."));
			const recordDeal = await prompt.get([{
				name: "recordDeal",
				description: menu("Do you want to sign a record deal? (y/n)"),
				type: "string",
				pattern: /^(y|n)$/i,
				message: error("Please enter 'y' or 'n'"),
				required: true
			}]);

			if ((recordDeal.recordDeal as unknown as string).toLowerCase() === "y") {
				this._isSigned = true;
				console.log(info("You've signed a record deal! They'll help you generate more money and fame at your shows."));
			} else {
				this._labelNoDay = this.day;
				console.log(info("You told him that your band isn't ready to sign yet. He told you that it was a shame, but he understands."));
			}
		}
		if (this.fame >= 5000) {
			console.log(alert("You've reached 5000 fame! Your band is officially a worldwide legend!"));
			console.log(info("Your band continues to become a household name, being a global icon of rock and roll. The future is looking bright for " + this.name + "!\n"));
			console.log(alert("You've won the game. Congratulations!"));
			console.log(("Final stats:\n" + 
				`Days: ${this.day}\n` +
				`Money: $${this.money}\n` +
				`Fame: ${this.fame}\n` +
				`Signed: ${this._isSigned ? "yes" : "no"}\n` +
				`Upgrades:\n` +
				`${this.names.vocals} (vocalist): ${this._upgrades.vocals}\n` +
				`${this.names.guitar} (guitarist): ${this._upgrades.guitar}\n` +
				`${this.names.bass} (bassist): ${this._upgrades.bass}\n` +
				`${this.names.drums} (drummer): ${this._upgrades.drums}\n` + "\n")
			);
			exit('' as unknown as Band);
		}
	}
}