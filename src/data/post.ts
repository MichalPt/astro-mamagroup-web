import { type CollectionEntry, getCollection } from "astro:content";
import { slugify } from "@/utils/strings";

/** filter out draft posts based on the environment */
// export async function getAllPosts(): Promise<CollectionEntry<"post">[]> {
// 	return await getCollection("post", ({ data }) => {
// 		return import.meta.env.PROD ? !data.draft : true;
// 	});
// }

/** filter out draft posts based on the environment */
export async function getAllNews(): Promise<CollectionEntry<"news">[]> {
	return await getCollection("news", ({ data }) => {
		return import.meta.env.PROD ? (data.visible ? data.visible : true ) : true;
	});
}

/** groups posts by year (based on option siteConfig.sortPostsByUpdatedDate), using the year as the key
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 */
export function groupPostsByYear(posts: CollectionEntry<"news">[]) {
	return posts.reduce<Record<string, CollectionEntry<"news">[]>>((acc, post) => {
		const year = post.data.date.getFullYear();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year]?.push(post);
		return acc;
	}, {});
}

/** groups posts by year (based on option siteConfig.sortPostsByUpdatedDate), using the year as the key
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 */
export function groupEventsByYear(events: CollectionEntry<"events">[]) {
	return events.reduce<Record<string, CollectionEntry<"events">[]>>((acc, event) => {
		const year = event.data.date[0].getFullYear();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year]?.push(event);
		return acc;
	}, {});
}

/** returns all tags created from posts (inc duplicate tags)
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getAllTags(entries: CollectionEntry<"news" | "events">[]) {
	return entries.flatMap((entry) => [...entry.data.tags]);
}

/** returns all unique tags created from posts
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTags(entries: CollectionEntry<"news" | "events">[]) {
	return [...new Set(getAllTags(entries))];
}

/** returns a count of each unique tag - [[tagName, count], ...]
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTagsWithCount(entries: CollectionEntry<"news" | "events">[]): [string, number][] {
	return [
		...getAllTags(entries).reduce(
			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}


export function getPostPath(post: CollectionEntry<"news" | "events">): string {
	let rootUrl;
	if (post.collection === "news") {
		rootUrl = `/news/${post.id}`;
	} else if (post.collection === "events") {
		rootUrl = `/events/${slugify(post.data.group || "uncategorized")}/${slugify(post.data.name)}`; 
	} else {
		throw new Error("Unsupported post type");
	}
	return rootUrl;
}