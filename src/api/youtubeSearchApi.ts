import { google } from 'googleapis';

const API_KEY = 'AIzaSyDQXUnuDv9p-wXDHPtUbc1o49OLSR7ciFo';
// const API_KEY = 'AIzaSyA2_6LnU_JyTpX3bcG_7SMN_kyQSfid2eY'

const searchByValue = async (searchTerm: string) => {
  try {
    const youtube = google.youtube({
      version: 'v3',
      auth: API_KEY, 
    });
    const searchResponse = await youtube.search.list({
      part: ['id', 'snippet'],
      q: searchTerm, 
      maxResults: 5,
    });
    if (searchResponse.status != 200) {
      console.log("Something went wrong, status: " + searchResponse.status + " statustext: " + searchResponse.statusText);
    }
    
    return searchResponse.data.items;

  } catch (error) {
    console.error('Received error when searching for videos:', error);
  }
};

export default searchByValue;