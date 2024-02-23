import searchByValue from '../../api/youtubeSearchApi'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function searchHandler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
      const { searchTerm } = request.body;
  
      try {
        const results = await searchByValue(searchTerm);
        response.status(200).json(results);
      } catch (error) {
        if (error instanceof Error) {
          response.status(500).json({ error: error.message });
        } else {
          response.status(500).json({ error: 'Something went wrong..' });
        }
      }
    } else {
        response.status(405).end(`Method ${request.method} Not Allowed`);
    }
  }