import { NextApiRequest, NextApiResponse } from "next";

export default async function getBill(req : NextApiRequest, res: NextApiResponse) {
    if(req.method == "GET") {
        const query = req.query;
        const billInfo = await fetch(`https://api.legiscan.com/?key=68dd8762bdfd60b2398db511ef856f39&op=getBill&id=${query.id}`)
        const result = await billInfo.json()
        res.status(200).json(result)
    }
}