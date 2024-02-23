import { google } from 'googleapis';

const API_KEY = 'AIzaSyDQXUnuDv9p-wXDHPtUbc1o49OLSR7ciFo';

const searchByValue = async () => {
  try {
    const youtube = google.youtube({
      version: 'v3',
      auth: API_KEY, 
    });
    //TODO: Change to a dynamic search param
    const searchResponse = await youtube.search.list({
      part: ['id', 'snippet'],
      q: 'add search here!!', 
      maxResults: 25,
    });

    if (searchResponse.data.items) {
      for (const item of searchResponse.data.items) {
        if (item.id?.videoId && item.snippet?.title) {
          console.log(`[${item.id.videoId}] Title: ${item.snippet.title}`);
        }
      }
    }
  } catch (error) {
    console.error('Received error when searching for videos:', error);
  }
};

export default searchByValue;