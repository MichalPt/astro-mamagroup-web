import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";
import { removeDupsAndLowerCase, slugify } from "./utils/strings.ts";
import { alertsLoader } from "./loaders/alertsLoader.ts";


const baseSchema = z.object({
	title: z.string().max(60),
	visible: z.boolean().default(true).optional(),
});

// const post = defineCollection({
// 	loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
// 	schema: ({ image }) =>
// 		baseSchema.extend({
// 			description: z.string(),
// 			coverImage: z
// 				.object({
// 					alt: z.string(),
// 					src: image(),
// 				})
// 				.optional(),
// 			draft: z.boolean().default(false),
// 			ogImage: z.string().optional(),
// 			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
// 			publishDate: z
// 				.string()
// 				.or(z.date())
// 				.transform((val) => new Date(val)),
// 			updatedDate: z
// 				.string()
// 				.optional()
// 				.transform((str) => (str ? new Date(str) : undefined)),
// 			// Series
// 			seriesId: z.string().optional(), // Поле для связи с серией
//       		orderInSeries: z.number().optional(), // Опционально: для сортировки в серии
// 			// End
// 		}),
// });

// const note = defineCollection({
// 	loader: glob({ base: "./src/content/note", pattern: "**/*.{md,mdx}" }),
// 	schema: baseSchema.extend({
// 		description: z.string().optional(),
// 		publishDate: z
// 			.string()
// 			.datetime({ offset: true }) // Ensures ISO 8601 format with offsets allowed (e.g. "2024-01-01T00:00:00Z" and "2024-01-01T00:00:00+02:00")
// 			.transform((val) => new Date(val)),
// 	}),
// });

const news = defineCollection({
	loader: glob({ base: "./src/content/news", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		baseSchema.extend({
			teaser: z.string().optional(),
			image: z
				.string()
				.optional(),
			tags: z
				.array(z.string())
				.default([])
				.transform(removeDupsAndLowerCase),
			date: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			createBanner: z.boolean().default(false).optional(),
			autoHideBanner: z.boolean().default(true).optional(),
			autoHideBannerAfter: z
				.number()
				.or(z.string().transform((val) => Number(val)))
				.default(30) // Default to 30 days
				.transform((val) => val * 24 * 60 * 60 * 1000) // Convert days to milliseconds
				.optional(),
			icon: z.string().optional().default("solar:clipboard-list-bold"),
		}),
});

// Events (MayMeeting, workshops, schools, etc.)
const events = defineCollection({
	loader: glob({ base: "./src/content/events", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
			name: z.string(),
			group: z.string(),
			date: z
				.string()
				.or(z.array(z.string()))
				.transform((val) =>
					Array.isArray(val)
						? val.map((d) => new Date(d))
						: [new Date(val)]
				),
			// date: z.string().or(z.array(z.string())),
				// .transform((val) => { Array.isArray(val) ? val.map((date) => new Date(date)) : new Date(val) }),
			tags: z
				.array(z.string())
				.default([])
				.transform(removeDupsAndLowerCase),
			createBanner: z.boolean().default(false).optional(),
			autoHideBanner: z.boolean().default(true).optional(),
			visible: z.boolean().default(true).optional(),
			icon: z.string().optional().default("ri:team-fill"),
		}),
});

const alerts = defineCollection({
	loader: alertsLoader(),
	schema: z.object({
		message: z.string(),
		visible: z.boolean().default(true).optional(),
		label: z.string().optional().default("alert"),
		autoHideBanner: z.boolean().default(false).optional(),
		autoHideBannerOn: z.string().or(z.date()).optional(),
		url: z.string().url().optional()
	})
});


// Function to create an outreach collection with a specific path
// This function allows for reusability and avoids code duplication
function createOutreachCollection(path: string) {
	return defineCollection({
		loader: glob({ base: `./src/content/${path}`, pattern: "**/*.json" }),
		schema: z.array(
					z.object({
						sectionTitle: z.string(),
						sectionVisible: z.boolean().default(true).optional(),
						sectionContent: z.array(
							z.object({
								subsectionTitle: z.string(),
								subsectionVisible: z.boolean().default(true).optional(),
								subsectionContent: z.array(
									z.object({
										title: z.string(),
										linkUrl: z.string().url().or(z.literal("")).optional(),
										date: z.string().or(z.date()).optional(),
										visible: z.boolean().default(true).optional(),
										type: z.enum(["video", "pdf", "website", "other"]).default("other").optional(),
										language: z.string().default("Czech").optional(),
										label: z.string().optional(),
										description: z.string().optional(),
										tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase).optional()
									})
								)
							})
						)
					})
				)
	})
};

// Function to create a course collection with a specific path
// This function allows for reusability and avoids code duplication
function createCourseCollection(path: string) { 
	return defineCollection({
		loader: glob({ base: `./src/content/${path}`, pattern: "**/*.json" }),
		schema: z.object({
			courseName: z.string(),
			courseCode: z.string().optional(),
			courseDescription: z.string().optional(),
			language: z.string(),
			semester: z.enum(["summer", "winter", "both"]).default("winter").optional(),
			courseVisible: z.boolean().default(true).optional(),
			showDates: z.boolean().default(false).optional(),
			content: z.array(
				z.object({
					sectionTitle: z.string(),
					sectionVisible: z.boolean().default(true).optional(),
					sectionContent: z.array(
						z.object({
							subsectionTitle: z.string(),
							subsectionVisible: z.boolean().default(true).optional(),
							subsectionContent: z.array(
								z.object({
									title: z.string(),
									videoUrl: z.string().url(),
									pdfName: z.string().or(z.array(z.string())).transform((val) => 
    												Array.isArray(val) ? val : [val]).optional(),
									visible: z.boolean().default(true).optional(),
									label: z.string().optional(),
									description: z.string().optional(),
									date: z.string().or(z.date()).optional(),
								})
							)
						})
					)
				})
			)
		})
	})
};

// Courses
const coursesMancal = createCourseCollection("mancal-teaching");
const coursesMaly = createCourseCollection("maly-teaching");

// Outreach
const outreachMancal = createOutreachCollection("mancal-outreach");

// Series
export const collections = { news, coursesMancal, coursesMaly, outreachMancal, events, alerts };
