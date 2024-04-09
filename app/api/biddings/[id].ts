import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

// DELETE api/biddings/:id
export async function deleteBidding(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const bidding = await prisma.bidding.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(bidding);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    return deleteBidding(req, res);
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
