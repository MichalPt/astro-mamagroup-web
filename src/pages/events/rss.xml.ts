import { getCollection } from "astro:content";
import { siteConfig } from "@/site.config";
import rss from "@astrojs/rss";
import { slugify } from "@/utils/strings";
import { formatDate } from "@/components/FormattedDate.astro";

export const GET = async () => {
    const events = await getCollection("events");

    return rss({
        title: siteConfig.title,
        description: siteConfig.description,
        site: import.meta.env.SITE,
        items: events.map((event) => ({
            title: event.data.name,
            // pubDate: note.data.date,
            link: `/events/${slugify(event.data.group)}/${slugify(event.data.name)}/`,
            description: formatDate(event.data.date),
        })),
    });
};