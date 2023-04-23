import { NextApiRequest, NextApiResponse } from "next";
import { Base64 } from 'base64-string'
const base64 = require('base64topdf');
const pdfUtil = require('pdf-to-text');


import cohere from 'cohere-ai';
cohere.init('zitvjK5dJu7kdy2u8FtU3jvzYG5gw9okxIIMPyYh')


export default async function summarizeBill(req : NextApiRequest, res: NextApiResponse) {
    if(req.method == "GET") {
        const docId = req.query.id;
        console.log(docId);
        const billText = await fetch(`https://api.legiscan.com/?key=68dd8762bdfd60b2398db511ef856f39&op=getBillText&id=${docId}`);
        const result = await billText.json();
        const pdfString = base64.base64ToStr(result.text.doc);
        const isPdf = pdfString.slice(0,4)=="%PDF";
        if (isPdf) {
            const pdf = base64.base64Decode(result.text.doc, 'bill.pdf');
            
            var option = {from: 0, to: 10000}; 
            const text = await pdfUtil.pdfToText(process.cwd() + "/bill.pdf", option, function(err, data) {
                if (err) throw(err);
                return data; //print text    
            });
            //code that converts the pdf to raw text
        }
        else {
            //code that converts the html to raw text
            
        }

        console.log("saved to pdf");
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