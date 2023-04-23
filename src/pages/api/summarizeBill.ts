import { NextApiRequest, NextApiResponse } from "next";
import { Base64 } from 'base64-string'

import cohere from 'cohere-ai';
cohere.init('zitvjK5dJu7kdy2u8FtU3jvzYG5gw9okxIIMPyYh')


export default async function summarizeBill(req : NextApiRequest, res: NextApiResponse) {
    if(req.method == "GET") {
        const billId = req.query.id;
        console.log(billId)
        const billText = await fetch(`https://api.legiscan.com/?key=68dd8762bdfd60b2398db511ef856f39&op=getBillText&id=${billId}`);
        const result = await billText.json();
        // console.log(result.text.doc)
        const encode = new Base64();
        console.log(result.text.doc)
        const b64 = encode.decode(result.text.doc)

        console.log(b64)
        // console.log(result);
    

    // (async () => {
    //     const response = await cohere.summarize({
    //         text: result
    //     })
    //     console.log(response);
    //     res.status(200).send(response)
        
    // });


    }
}