import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: "Michal Ptáček",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "cs",
		options: {
			day: "numeric",
			month: "numeric",
			year: "numeric",
			timeZone: "Europe/Prague",
		},
	},
	// Used as the default description meta property and webmanifest description
	description: "MaMa Group - research group at the Institute of Physics, Charles University, Czechia.",
	// HTML lang property, found in src/layouts/Base.astro L:18 & astro.config.ts L:48
	lang: "en-GB",
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "en_GB",
	// Used to construct the meta title property found in src/components/BaseHead.astro L:11, and webmanifest name found in astro.config.ts L:42
	title: "MaMa Group",
};

// Settingsfor the number of elemnts to be displayed in auto generated lists (on home page and in pagination environment).
export const siteSettings = {
	homePage: {
		carouselNews: 3,  // Number of news items to display in the carousel on the home page ... plus the welcome slide with FMO
		newestNews: 8,	  // Number of news items to display in the "News" section on the home page
		newestEvents: 6	  // Number of events to display in the "Events" section on the home page
	},
	newsPerPage: 20,	  // Number of news items to display on a single news page
	eventsPerPage: 20,	  // Number of events to display on a single events page
	maxTags: 10, 		  // Maximum number of tags to display in the tag island
	//
	passwordHint: "Universitas ******** founded in ****",  // Hint for the password protected pages
	//
	omitInPublicationList: ["author correction", ],   // List of strings that if found in a publication title, that publication will not be displayed in the list
	//
	reopenBannerAfter: 30, // Time in minutes after which the banner will be reopened after being closed by the user
}


// Used to generate links in both the Header & Footer.
export const menuLinks: { path: string; title: string; showsub?: boolean; subfolder?: object }[] = [
	{
		path: "/mancal",
		title: "Tomáš Mančal",
		showsub: true,
		subfolder: [
			{
				path: "/about",
				title: "About Me"
			},
			{
				path: "/teaching",
				title: "Teaching"
			},
			{
				path: "/publications",
				title: "Publications"
			},
			{
				path: "/outreach",
				title: "Outreach"
			}
		]
	},
	{
		path: "/maly",
		title: "Pavel Malý",
		showsub: true,
		subfolder: [
			{
				path: "/about",
				title: "About Me"
			},
			{
				path: "/teaching",
				title: "Teaching"
			},
			{
				path: "/publications",
				title: "Publications"
			},
			{
				path: "/outreach",
				title: "Outreach"
			}
		]
	},
	{
		path: "/group",
		title: "Research Group",
	},
	{
		path: "/contacts",
		title: "Contacts",
	}
];