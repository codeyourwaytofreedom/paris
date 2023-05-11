import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Set response headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Content-Encoding', 'none');


    const sendCoinData = async () => {
      // Make the API request
      const response = await fetch("https://api.coincap.io/v2/assets");
      const data = await response.json();
      res.write(`data: ${JSON.stringify(data.data)}\n\n`);
      res.end();
    };

    await sendCoinData();

    // Handle client connection close
    req.on('close', () => {
      res.end();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


