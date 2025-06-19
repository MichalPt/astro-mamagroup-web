import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/site.config";

export function getFormattedDate(
    date: Date | Array<String | Date> | undefined,
    options?: DateTimeFormatOptions,
): string {
    if (date === undefined) {
        return "Invalid Date";
    }

    return new Intl.DateTimeFormat('en-GB', {
        ...(siteConfig.date.options as DateTimeFormatOptions),
        ...options,
    }).format(new Date(date));
}

export function collectionDateSort(
    a: CollectionEntry<"news" | "events">, // Remove "post" reference
    b: CollectionEntry<"news" | "events">, // Remove "post" reference
) {
    // Handle news items with publishDate
    // if (a.data.date && b.data.date) {
    //     return b.data.date.getTime() - a.data.date.getTime();
    // }
    // // Handle events with date array
    // else 
    if (a.data.date && b.data.date) {
        const aDate = Array.isArray(a.data.date) ? a.data.date[0] : a.data.date;
        const bDate = Array.isArray(b.data.date) ? b.data.date[0] : b.data.date;
        return bDate.getTime() - aDate.getTime();
    }
    // // Mixed types: news vs events
    // else if (a.data.date && b.data.date) {
    //     const bDate = Array.isArray(b.data.date) ? b.data.date[0] : b.data.date;
    //     return bDate.getTime() - a.data.date.getTime();
    // }
    // else if (a.data.date && b.data.date) {
    //     const aDate = Array.isArray(a.data.date) ? a.data.date[0] : a.data.date;
    //     return b.data.date.getTime() - aDate.getTime();
    // }
    // Fallback
    return 0;
}

export function collectionDateIntervalSort(
    a: CollectionEntry<"events">,
    b: CollectionEntry<"events">,
) {
    const aDate = Array.isArray(a.data.date) ? a.data.date[0] : a.data.date;
    const bDate = Array.isArray(b.data.date) ? b.data.date[0] : b.data.date;
    return bDate.getTime() - aDate.getTime();
}

// Helper function to extract date from any collection entry
export function getEntryDate(entry: CollectionEntry<"news" | "events">): Date | undefined {
    if ('publishDate' in entry.data && entry.data.date) {
        return entry.data.date;
    }
    if ('date' in entry.data && entry.data.date) {
        return Array.isArray(entry.data.date) ? entry.data.date[0] : entry.data.date;
    }
    return undefined;
}

export function formatDateInterval(dates: Date[] | string[]): string {
    if (!Array.isArray(dates) || dates.length === 0) return "";

    // Convert to Date objects if needed
    const toDate = (d: Date | string) => d instanceof Date ? d : new Date(d);
    const [start, end] = [toDate(dates[1]), dates.length > 1 ? toDate(dates[0]) : null];

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