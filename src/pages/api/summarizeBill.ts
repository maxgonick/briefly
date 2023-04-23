import { NextApiRequest, NextApiResponse } from "next";
import { Base64 } from 'base64-string'
const base64 = require('base64topdf');
const pdfUtil = require('pdf-to-text');
const { convert } = require('html-to-text');

import cohere from 'cohere-ai';
cohere.init('zitvjK5dJu7kdy2u8FtU3jvzYG5gw9okxIIMPyYh')


export default async function summarizeBill(req : NextApiRequest, res: NextApiResponse) {
    if(req.method == "GET") {
        const docId = req.query.id;
        const billText = await fetch(`https://api.legiscan.com/?key=68dd8762bdfd60b2398db511ef856f39&op=getBillText&id=${docId}`);
        const result = await billText.json();
        const rawString = base64.base64ToStr(result.text.doc);
        const isPdf = rawString.slice(0,4)=="%PDF";
        let text;
        if (isPdf) {
            const pdf = base64.base64Decode(result.text.doc, 'bill.pdf');
            const option = {from: 0, to: 10000}; 
            text = await pdfUtil.pdfToText(process.cwd() + "/bill.pdf", option, function(err, data) {
                if (err) throw(err);
                return data; //print text    
            });
            //code that converts the pdf to raw text
        }
        else {
            const options = {
                wordwrap: 130,
                // ...
              };
            text = convert(rawString, options).slice(0,10000);
        }

    await (async () => {
        const response = await cohere.summarize({
            text: text
        })
        console.log("summarizeBill finished");
        res.status(200).send(response);
    })();
    }
}