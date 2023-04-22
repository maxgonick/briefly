// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const query = req.query;
    const billRequest = await fetch(`https://api.legiscan.com/?key=68dd8762bdfd60b2398db511ef856f39&op=getMasterList&state=${query['state']}`);
    const result = await billRequest.json();     
    if(result['status'] === 'OK'){
      res.status(200).json(result['masterlist']);
    }

  } else {
    res.status(404).json({ message: 'not found'});
  }

}
