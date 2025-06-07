const omitCapitalizing = ["de", "da", "von", "van", "la", "le"];

export function capitalize(str: string): string {
    const list = str.split(' '); 
    const capitalized = list.map(n => omitCapitalizing.some(omit => omit.toLowerCase() === n.toLowerCase()) ? 
        n.toLowerCase() :
        n.charAt(0).toUpperCase() + n.slice(1)
    );
    return capitalized.join(' ');
    }

export function slugify(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
        .replace(/\s/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
        .replace(/(^-|-$)+/g, "");
}

export function processCourseId(courseId: string): string {
    return courseId.split('/')[0] ?? courseId;
}