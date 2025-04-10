const omitCapitalizing = ["de", "da", "von", "van", "la", "le"];

export function capitalize(str: string): string {
    const list = str.split(' '); 
    const capitalized = list.map(n => omitCapitalizing.some(omit => omit.toLowerCase() === n.toLowerCase()) ? 
        n.toLowerCase() :
        n.charAt(0).toUpperCase() + n.slice(1)
    );
    return capitalized.join(' ');
    }