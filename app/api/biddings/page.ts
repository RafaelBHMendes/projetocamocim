import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

// GET api/biddings
export async function getBiddings(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const biddings = await prisma.bidding.findMany();
      res.status(200).json(biddings);
    } else {
      // Handle other HTTP methods or return a 405 for methods not allowed
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Error fetching biddings' });
  }
}

// POST api/biddings
export async function createBidding(req: NextApiRequest, res: NextApiResponse) {
  const { processNumber, object, date, opening } = req.body;
  try {
    const newBidding = await prisma.bidding.create({
      data: {
        processNumber,
        object,
        date: new Date(date),
        opening,
      },
    });
    res.status(201).json(newBidding);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getBiddings(req, res);
    case 'POST':
      return createBidding(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
