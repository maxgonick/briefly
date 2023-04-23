import { NextApiRequest, NextApiResponse } from "next";

import cohere from 'cohere-ai';
cohere.init('zitvjK5dJu7kdy2u8FtU3jvzYG5gw9okxIIMPyYh')


export default async function summarizeBill(req : NextApiRequest, res: NextApiResponse) {
    if(req.method == "GET") {
      (async () => {
        const response = await cohere.summarize({
          text: req.query.input,
        });
        console.log(response);
        res.status(200).send(response)
      })();


    }
}