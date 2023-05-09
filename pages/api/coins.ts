import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Set response headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendCoinData = async () => {
      // Make the API request
      const response = await fetch("https://api.coincap.io/v2/assets");
      const data = await response.json();

      // Format the data and send to client
      data.data.forEach((item: any) => {
        const eventData = {
          id: item.id,
          name: item.name,
          priceUsd: item.priceUsd
        };
        res.write(`data: ${JSON.stringify(eventData)}\n\n`);
      });
    };

    sendCoinData();

    // Update coin data every 5 seconds
    const intervalId = setInterval(async () => {
      await sendCoinData();
    }, 5000);

    // Handle client connection close
    req.on('close', () => {
      clearInterval(intervalId);
      res.end();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


