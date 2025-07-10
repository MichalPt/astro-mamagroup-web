const omitCapitalizing = ["de", "da", "von", "van", "la", "le"];

export function capitalize(str: string): string {
    const list = str.split(' '); 
    const capitalized = list.map(n => omitCapitalizing.some(omit => omit.toLowerCase() === n.toLowerCase()) ? 
        n.toLowerCase() :
        n.charAt(0).toUpperCase() + n.slice(1)
    );
    return capitalized.join(' ');
    }

export function removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function slugify(str: string): string {
    return removeAccents(str) // Remove accents
        .toLowerCase() // Convert to lowercase
        .trim() // Trim whitespace from both ends
        .replace(/[^a-z0-9\s]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
        .replace(/\s/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
        .replace(/(^-|-$)+/g, ""); // Remove leading and trailing hyphens
}

export function processCourseId(courseId: string): string {
    return courseId.split('/')[0] || courseId; // Get the first part before any slash
}

export function removeDupsAndLowerCase(array: string[]) {
	return [...new Set(array.map((str) => str.toLowerCase()))];
}