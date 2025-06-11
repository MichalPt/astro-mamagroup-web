import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/site.config";

export function getFormattedDate(
	date: Date | undefined,
	options?: Intl.DateTimeFormatOptions,
): string {
	if (date === undefined) {
		return "Invalid Date";
	}

	return new Intl.DateTimeFormat('en-GB', {
		...(siteConfig.date.options as Intl.DateTimeFormatOptions),
		...options,
	}).format(date);
}

export function collectionDateSort(
	a: CollectionEntry<"post" | "note" | "news">,
	b: CollectionEntry<"post" | "note" | "news">,
) {
	return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}

export function collectionDateIntervalSort(
	a: CollectionEntry<"events">,
	b: CollectionEntry<"events">,
) {
	return b.data.date[0].getTime() - a.data.date[0].getTime();
}

export function formatDateInterval(dates: Date[] | string[]): string {
    if (!Array.isArray(dates) || dates.length === 0) return "";

    // Convert to Date objects if needed
    const toDate = (d: Date | string) => d instanceof Date ? d : new Date(d);
    const [start, end] = [toDate(dates[0]), dates.length > 1 ? toDate(dates[1]) : null];

    const pad = (n: number) => n.toString().padStart(2, "0");

    if (dates.length === 1 || !end) {
        return `${pad(start.getDate())}/${pad(start.getMonth() + 1)}/${start.getFullYear()}`;
    }

    // If years differ, show full for both
    if (start.getFullYear() !== end.getFullYear()) {
        return `${pad(start.getDate())}/${pad(start.getMonth() + 1)}/${start.getFullYear()} – ${pad(end.getDate())}/${pad(end.getMonth() + 1)}/${end.getFullYear()}`;
    }
    // If months differ, show month for both, year once
    if (start.getMonth() !== end.getMonth()) {
        return `${pad(start.getDate())}/${pad(start.getMonth() + 1)} – ${pad(end.getDate())}/${pad(end.getMonth() + 1)}/${end.getFullYear()}`;
    }
    // Same month and year, show day-day/month/year
    return `${pad(start.getDate())} – ${pad(end.getDate())}/${pad(end.getMonth() + 1)}/${end.getFullYear()}`;
}
