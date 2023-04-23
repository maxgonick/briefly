//@ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import cohere from 'cohere-ai';
import { generateRequest } from "cohere-ai/dist/models";
cohere.init('zitvjK5dJu7kdy2u8FtU3jvzYG5gw9okxIIMPyYh');

export default async function writeEmail(req : NextApiRequest, res: NextApiResponse) {
    if(req.method == "GET") {
        const billName = req.query.name;
        const billSponsor = req.query.sponsor;
        const proEmailPrompt = `Dear Representative ${billSponsor}, I wanted to contact you in regards of your legislation ${billName}, as it has had profound impacts in our community.`;
        const antiEmailPrompt = `Dear Representative ${billSponsor}, I wanted to voice my opposing viewpoint to this legislation, as you were the representative that sponsored ${billName}, and I wanted to reach out to my elected officials on what I believe.`;
        
    await (async () => {
        const pInput : generateRequest = {
            prompt: proEmailPrompt,
            model: "command-xlarge-nightly",
            temperature: 1.2,
            k: 500,
        }

        const p2email = await cohere.generate(pInput);
        const pEmail = `Dear Representative ${billSponsor}, I wanted to contact you in regards of your legislation ${billName}, as it has had profound impacts in our community. ${p2email.body.generations[0].text} Thank you for representing our communities.${"\n"} Sincerely, ${"\n"} [your name]`;
        const aInput : generateRequest = {
            prompt: antiEmailPrompt,
            model: "command-xlarge-nightly",
            temperature: 1.2,
            k: 500
        }
        const a2email = await cohere.generate(aInput)
        const aEmail = `Dear Representative ${billSponsor}, I wanted to voice my opposing viewpoint to this legislation, as you were the representative that sponsored ${billName}, and I wanted to reach out to my elected officials on what I believe. ${a2email.body.generations[0].text} Thank you for representing our communities, and we hope you can. ${"\n"} Sincerely, ${"\n"} [your name]`;
        // const response = await JSON.stringify({proEmail: pEmail, antiEmail: aEmail});
        // console.log(response);
        res.status(200).json({proEmail: pEmail, antiEmail: aEmail});
    })();
    }
}