import orcidFetch from '@/scripts/orcidFetcher.js';
import fs from 'fs/promises';
import { getFormattedDate } from '@/utils/date.js';

const getPublicationList = async (orcid) => {
    const filePath = `src/content/publications/${orcid}.json`;
    const today = new Date();

    try {
        // throw new Error('Test error for catch block');  // Uncomment this line to test the error handling

        const token = import.meta.env.ORCID_ACCESS_TOKEN;
        const works = await orcidFetch(orcid, token);

        // Save works to JSON file
        const jsonOutput = {
            "date": today.toISOString(), 
            "orcid":orcid, 
            "data":works,
        }
        await fs.writeFile(
            filePath, 
            JSON.stringify(jsonOutput),
            'utf-8',
        );
        
        return jsonOutput;

    } catch (error) {
        console.error(`Error fetching publications for ORCID ${orcid}:`, error);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const jsonFile = JSON.parse(fileContent);

        const fetchDate = new Date(jsonFile.date);
        const fetchTimeString = fetchDate.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        console.log(`Using cached file from ${getFormattedDate(fetchDate)} ${fetchTimeString}: ${filePath}`);
        
        return jsonFile;
    };
};

export default getPublicationList;