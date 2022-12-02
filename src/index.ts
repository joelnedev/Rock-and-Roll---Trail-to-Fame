import prompt from "./util/prompt.js";
import Band from "./util/band.js";
import type { MemberType } from "./data/types";
import fs from "fs";
import { error, alert, info, input, menu } from "./util/chalk.js";

const path = process.platform == "win32"
	? process.env.APPDATA + "\\Baljeet Studios\\Rock and Roll Trail to Fame\\band.json"
	: process.env.HOME + "/Library/Application Support/com.baljeetstudios.trailtofame/band.json";

export const exit = (band: Band, save: boolean = true) => {

	prompt.get([
		{
			name: "confirm",
			description: alert(`Are you sure you want to exit the game? Progress will be saved to ${path} (y/n)`),
			type: "string",
			pattern: /^(y|n)$/i,
			message: error("Please enter 'y' or 'n'"),
			required: true
		}
	],
	(err, result) => {
		if (err) throw err;
		if ((result.confirm as string).toLowerCase() === "y") {
			if (save) {
				const bandData = JSON.stringify({
					_isSigned: band._isSigned,
					_lastUnlockedVenue: band._lastUnlockedVenue,
					_labelNoDay: band._labelNoDay,
					_scoreset: band._scoreset,
					_upgrades: band._upgrades,
					day: band.day,
					money: band.money,
					fame: band.fame
				});
				fs.writeFileSync(path, bandData, "utf8");
			}
			console.log(alert("Game saved. Goodbye!"));
			process.exit(0);
		} else if (band == '' as unknown as Band) {
			fs.rmSync(path);
		};
	});
};

let band: Band|undefined = undefined;

if (fs.existsSync(path)) {
	prompt.get([{
		name: "load",
		description: alert("A save file was found. Would you like to load it? (y/n)"),
		type: "string",
		pattern: /^(y|n)$/i,
		message: error("Please enter 'y' or 'n'"),
		required: true
	}], (err, result) => {
		if (err) throw err;
		if ((result.load as string).toLowerCase() === "n") return;
		const bandData = JSON.parse(fs.readFileSync(path, "utf8"));
		band = new Band(bandData.name, bandData.names);
		band._isSigned = bandData._isSigned;
		band._lastUnlockedVenue = bandData._lastUnlockedVenue;
		band._labelNoDay = bandData._labelNoDay;
		band._scoreset = bandData._scoreset;
		band._upgrades = bandData._upgrades;
		band.day = bandData.day;
		band.money = bandData.money;
		band.fame = bandData.fame;

		console.log(info("Welcome back to Rock and Roll: Trail to Fame!"));
	});
}

if (!band) {
	console.log(info("Welcome to Rock and Roll: Trail to Fame!\n"));
	console.log(info("You are the manager of a rock and roll band, and they're relying on you to make them rock legends!"));
	console.log(info("You'll have to manage their finances, their equipment, and schedule their shows to make them the best band in the world!\n"));
	console.log(info("Let's get started!"));

	const initResults = await prompt.get([
		{
			name: "name",
			description: input("What is the name of your band?"),
			required: true
		},
		{
			name: "vocals",
			description: input("What is the name of your vocalist?"),
			required: true
		},
		{
			name: "guitar",
			description: input("What is the name of your guitarist?"),
			required: true
		},
		{
			name: "bass",
			description: input("What is the name of your bassist?"),
			required: true
		},
		{
			name: "drums",
			description: input("What is the name of your drummer?"),
			required: true
		},
		{
			name: "difficulty",
			description: input("Would you like to change the difficulty from default? (0 = Easy, 1 = Normal, 2 = Hard)"),
			required: false,
			pattern: /^(0|1|2)$/,
			message: error("Please enter a number between 0 and 2")
		}
	]);

	band = new Band(initResults.name as string, { vocals: initResults.vocals as string, guitar: initResults.guitar as string, bass: initResults.bass as string, drums: initResults.drums as string} );
	console.log(info("\n1Your band is called " + band.name + " and your members are:"));
	console.log(info("Vocalist: " + band.names.vocals));
	console.log(info("Guitarist: " + band.names.guitar));
	console.log(info("Bassist: " + band.names.bass));
	console.log(info("Drummer: " + band.names.drums + "\n"));
	console.log(info("You have $" + band.money + " to spend on equipment upgrades and other opportunities."));
	console.log(info("Each day, you can buy one equipment upgrade at the store, and perform perform one show at a venue."));
	console.log(info("Good luck!\n"));
}

const mainMenu = async () => {
	console.log(menu("Perform a show (1)"));
	console.log(menu("Buy equipment (2)"));
	console.log(menu("Next day (3)"));
	console.log(menu("Exit (4)"));
	const result = await prompt.get({
		name: "action",
		description: input("What do you want to do?"),
		type: "number",
		required: true,
		message: error("Please enter a number corresponding to a valid action"),
		conform: (value: number) => {
			return value >= 1 && value <= 4;
		}
	});

	const actions = [
		"perform",
		"upgrade",
		"nextDay",
		"exit"
	];

	switch (actions[result.action as number - 1]) {
		case "perform":
			const venues = band!.venueList();
			if (!venues) {
				console.log(error("You have no venues to perform at!"));
				return 2;
			} // <- this block is never reached, but it keeps TypeScript happy
			console.log(menu(`Available venues for your band:\n`));
			let count = 0;
			console.log(venues.map(venue => {
				count++;
				return menu(`${venue.name} (${count})\nFame Requirement: ${venue.fameMin}\nPopularity Multiplier: ${venue.multiplier}`)
			}).join("\n\n"));
			

			const venueResult = await prompt.get({
				name: "venue",
				description: input("Which venue do you want to perform at?"),
				type: "number",
				required: true,
				message: error("Please enter a valid venue number"),
				conform: (value: number) => {
					return venues.length >= value && value > 0;
				}
			});
			band!.performShow(venues[venueResult.venue as number - 1]);
			return 2;
		case "upgrade":
			console.log(info("You have $" + band!.money + " to spend on equipment upgrades and other opportunities."));
			console.log(menu("Available upgrades for your band members:\n"));
			const upgrades = {
				vocals: band!.nextUpgrade("vocals"),
				guitar: band!.nextUpgrade("guitar"),
				bass: band!.nextUpgrade("bass"),
				drums: band!.nextUpgrade("drums")
			};
			console.log(menu(`${band!.names.vocals} (vocals - 1): ${upgrades.vocals
				? `Level ${upgrades.vocals.level}\nName: ${upgrades.vocals.name}\nCost: $${upgrades.vocals.cost}\nDescription: ${upgrades.vocals.description}\n`
				: "Fully upgraded!\n"}`)
			);
			console.log(menu(`${band!.names.guitar} (guitar - 2): ${upgrades.guitar
				? `Level ${upgrades.guitar.level}\nName: ${upgrades.guitar.name}\nCost: $${upgrades.guitar.cost}\nDescription: ${upgrades.guitar.description}\n`
				: "Fully upgraded!\n"}`)
			);
			console.log(menu(`${band!.names.bass} (bass - 3): ${upgrades.bass
				? `Level ${upgrades.bass.level}\nName: ${upgrades.bass.name}\nCost: $${upgrades.bass.cost}\nDescription: ${upgrades.bass.description}\n`
				: "Fully upgraded!\n"}`)
			);
			console.log(menu(`${band!.names.drums} (drums - 4): ${upgrades.drums
				? `Level ${upgrades.drums.level}\nName: ${upgrades.drums.name}\nCost: $${upgrades.drums.cost}\nDescription: ${upgrades.drums.description}\n`
				: "Fully upgraded!\n"}`)
			);
			const { upgrade } = await prompt.get({
				name: "upgrade",
				description: input("Which upgrade do you want to buy?"),
				type: "number",
				required: true,
				message: error("Please enter a number corresponding to a valid upgrade"),
				conform: (value: number) => {
					return value >= 1 && value <= 4;
				}
			});
			band!.upgrade(["vocals", "guitar", "bass", "drums"][upgrade as number - 1] as MemberType);
			return 2;
		case "nextDay":
			band!.nextDay();
			return 2;
		case "exit":
			return 1;
	}
};

while (true) {
	const menuResult = await mainMenu();
	if (menuResult === 1) break;
}
exit(band);