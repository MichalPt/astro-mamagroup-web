import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

function removeDupsAndLowerCase(array: string[]) {
	return [...new Set(array.map((str) => str.toLowerCase()))];
}

const baseSchema = z.object({
	title: z.string().max(60),
});

const post = defineCollection({
	loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		baseSchema.extend({
			description: z.string(),
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			draft: z.boolean().default(false),
			ogImage: z.string().optional(),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			// Series
			seriesId: z.string().optional(), // Поле для связи с серией
      		orderInSeries: z.number().optional(), // Опционально: для сортировки в серии
			// End
		}),
});

const note = defineCollection({
	loader: glob({ base: "./src/content/note", pattern: "**/*.{md,mdx}" }),
	schema: baseSchema.extend({
		description: z.string().optional(),
		publishDate: z
			.string()
			.datetime({ offset: true }) // Ensures ISO 8601 format with offsets allowed (e.g. "2024-01-01T00:00:00Z" and "2024-01-01T00:00:00+02:00")
			.transform((val) => new Date(val)),
	}),
});

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
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
		}),
});


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
									description: z.string().optional()
								})
							)
						})
					)
				})
			)
		})
	})
};

const coursesMancal = createCourseCollection("mancal-teaching");
const coursesMaly = createCourseCollection("maly-teaching");

// Series
const series = defineCollection({
	loader: glob({ base: "./src/content/series", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		description: z.string(),
		featured: z.boolean().default(false),
	}),
});
// End

// Series
export const collections = { post, note, series, news, coursesMancal, coursesMaly };
