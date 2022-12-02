import type { Venue } from "./types";

const venues: Venue[] = [
	{
		name: "Mom's Garage",
		cost: 0,
		prompt: "Your guitarist's sweet, supportive mom just heard you play and would love a show at her garage",
		description: "Perform in the guitarist's mom's garage for a small audience of neighbors, friends, and family.",
		fameMin: 0,
		multiplier: 0.75
	},
	{
		name: "The Jealous Pirate",
		cost: 200,
		prompt: "One of the bassist's buddy's uncle owns a local pub and their Tuesday regular band's moved on. He's on short time to get another act in.",
		description: "A small pub nearby with live music every night. A few people come here to drink and listen to music.",
		fameMin: 150,
		multiplier: 1.25
	},
	{
		name: "Ale Emporium",
		cost: 500,
		prompt: "One of the bartenders at the local pub you played at heard you and is offering to put a good word in for you at the Ale Emporium.",
		description: "A local bar/restaurant that hosts live music every weekend. It's a great place to get your name out there.",
		fameMin: 250,
		multiplier: 1.5
	},
	{
		name: "The Round Coconut",
		cost: 1000,
		prompt: "The owner of a local club found you on YouTube and wants you to play at his club.",
		description: "A local club that hosts live music every weekend. There's not many music enthusiasts here, but it's a prime spot to catch the attention of someone important.",
		fameMin: 500,
		multiplier: 1.75
	},
	{
		name: "The Rocking Horse",
		cost: 2000,
		prompt: "The owner of a big-name club heard you play at The Coconut and he's interested in booking you a Saturday night.",
		description: "A big-name club downtown that hosts live music and loads of people every weekend. There's a lot of open ears here, clubbers, enthusiasts, and executives alike.",
		fameMin: 750,
		multiplier: 2
	},
	{
		name: "Jameson Music Center",
		cost: 2500,
		prompt: "An executive at a local music center loved your performance at The Rocking Horse and wants you to open for a huge band.",
		description: "A local music venue that's hosted many big-name acts. Getting a gig here is a big deal!",
		fameMin: 1000,
		multiplier: 2.25
	},
	{
		name: "The Met Philidelphia",
		cost: 3000,
		prompt: "You caught the attention of a rock legend! He wants you to open for them at a big-name venue in Philly.",
		description: "You'll be opening for a household-name band in this huge stadium that hosts big-name acts. Getting a gig here is a huge deal!",
		fameMin: 1500,
		multiplier: 2.5
	},
	{
		name: "TCU Amphitheater on the White River",
		cost: 3000,
		prompt: "You caught the attention of a rock legend! He wants you to open for them at a big-name venue in Indianapolis.",
		description: "You'll be opening for a household-name band in this huge stadium that hosts big-name acts. Getting a gig here is a huge deal!",
		fameMin: 1500,
		multiplier: 2.5
	},
	{
		name: "White Oak Music Hall",
		cost: 3000,
		prompt: "You caught the attention of a rock legend! He wants you to open for them at a big-name venue in Houston.",
		description: "You'll be opening for a household-name band in this huge stadium that hosts big-name acts. Getting a gig here is a huge deal!",
		fameMin: 1500,
		multiplier: 2.5
	},
	{
		name: "Soldier Field",
		cost: 500,
		prompt: "You're so famous, big-name companies are begging you to play at their events. Ticketmaster wants YOUR band to headline in Chicago.",
		description: "A huge stadium that hosts famous acts. This is a HUGE deal!",
		fameMin: 3000,
		multiplier: 3
	},
	{
		name: "Hard Rock Stadium",
		cost: 500,
		prompt: "You're so famous, big-name companies are begging you to play at their events. Ticketmaster wants YOUR band to headline in Miami.",
		description: "A huge stadium that hosts famous acts. This is a HUGE deal!",
		fameMin: 3000,
		multiplier: 3
	},
	{
		name: "Bank of America Stadium",
		cost: 500,
		prompt: "You're so famous, big-name companies are begging you to play at their events. Ticketmaster wants YOUR band to headline in Charlotte.",
		description: "A huge stadium that hosts famous acts. This is a HUGE deal!",
		fameMin: 3000,
		multiplier: 3
	},
	{
		name: "Metlife Stadium",
		cost: 500,
		prompt: "You're so famous, big-name companies are begging you to play at their events. Ticketmaster wants YOUR band to headline in New Jersey.",
		description: "A huge stadium that hosts famous acts. This is a HUGE deal!",
		fameMin: 3000,
		multiplier: 3
	},
	{
		name: "Allegiant Stadium",
		cost: 500,
		prompt: "You're so famous, big-name companies are begging you to play at their events. Ticketmaster wants YOUR band to headline in Las Vegas.",
		description: "A huge stadium that hosts famous acts. This is a HUGE deal!",
		fameMin: 3000,
		multiplier: 3
	}
];
export default venues;