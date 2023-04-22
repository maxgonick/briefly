// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const query = req.query;
    const billRequest = await fetch(
        `https://api.legiscan.com/?key=68dd8762bdfd60b2398db511ef856f39&op=getSearch&state=${query["state"]}&query=${query["query"]}&year=2`
    );
    if (billRequest.status >= 400) {
      res.status(404).json({message: 'Request for bills failed'});
    } else {
      const result = await billRequest.json();
      if (result["status"] === "OK") {
        res.status(200).json(result['searchresult']);
      } else {
        res.status(404).json({message: 'Failed to find what you searched for'});
      }
    }
  } else {
    res.status(404).json('This endpoint is only for GET Requests.');
  }
}
