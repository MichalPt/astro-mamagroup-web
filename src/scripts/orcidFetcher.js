import fetch from 'node-fetch';

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
    const journal = work['work-summary'][0]['type'] === 'journal-article' ? work['work-summary'][0]['journal-title']?.['value'] : 'N/A';
    const pubDate = work['work-summary'][0]['publication-date'];
    const doi = work['work-summary'][0]['external-ids']['external-id'].find(id => id['external-id-type'] === 'doi')?.['external-id-value'];
    return { title, journal, pubDate, doi };
  });

  return works;
};

export default fetchWorks;