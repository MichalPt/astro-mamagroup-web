import fetch from 'node-fetch';
import { capitalize } from '@/utils/strings';


//// version 1 - without authors:

const fetchWorks = async (orcid, token) => {
  const url = `https://pub.orcid.org/v3.0/${orcid}/works`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/vnd.orcid+json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const works = data.group.map(work => {
    const title = work['work-summary'][0]['title']['title']['value'];
    const journal = work['work-summary'][0]['type'] === 'journal-article' || 'other' ? work['work-summary'][0]['journal-title']?.['value'] : "";
    const pubDate = work['work-summary'][0]['publication-date'];
    const doi = work['work-summary'][0]['external-ids']['external-id'].find(id => id['external-id-type'] === 'doi')?.['external-id-value'];
    return { title, journal, pubDate, doi };
  });

  return works;
};


//// version 2 - with authors

// const fetchWithRetry = async (url, options, retries = 10, backoff = 600) => {
//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     if (retries > 0 && error.message.includes('503')) {
//       await new Promise(resolve => setTimeout(resolve, backoff));
//       return fetchWithRetry(url, options, retries - 1, backoff * 2);
//     } else {
//       throw error;
//     }
//   }
// };

// const fetchWorks = async (orcid, token) => {
//   const url = `https://pub.orcid.org/v3.0/${orcid}/works`;
//   const options = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/vnd.orcid+json',
//       'Authorization': `Bearer ${token}`
//     }
//   };

//   const data = await fetchWithRetry(url, options);
//   const works = await Promise.all(data.group.map(async work => {
//     const title = work['work-summary'][0]['title']['title']['value'];
//     const journal = work['work-summary'][0]['type'] === 'journal-article' || 'other' ? work['work-summary'][0]['journal-title']?.['value'] : 'N/A';
//     const pubDate = work['work-summary'][0]['publication-date'];
//     const doi = work['work-summary'][0]['external-ids']['external-id'].find(id => id['external-id-type'] === 'doi')?.['external-id-value'];
//     const path = work['work-summary'][0]['path'];

//     const workDetails = await fetchWithRetry(`https://pub.orcid.org/v3.0${path}`, options);
//     const authors = workDetails['contributors']?.contributor.map(contributor => contributor['credit-name']['value']) || [];
//     const capAuthors = capitalize(authors.join(', '))
//     // return { title, journal, pubDate, doi, authors: authors.join(', ') };
//     return { title, journal, pubDate, doi, authors: capAuthors };
//   }));

//   return works;
// };

//// output:
export default fetchWorks;