import { NextApiRequest, NextApiResponse } from "next";
import cohere from 'cohere-ai';
cohere.init('zitvjK5dJu7kdy2u8FtU3jvzYG5gw9okxIIMPyYh');

export default async function writeEmail(req : NextApiRequest, res: NextApiResponse) {
    if(req.method == "GET") {
        const billName = req.query.name;
        const billSponsor = req.query.sponsor;
        const proEmailPrompt = `Hello honorable Representative ${billSponsor}, I wanted to commend your sponsorship of ${billName}, as it has profound impacts on American society.`;
        const antiEmailPrompt = `Hello honorable Representative ${billSponsor}, I wanted to voice my opposing viewpoint to this legislation, seeing that you are the sponsor of ${billName}, and I felt the imperative to reach out to my elected officials and dissuade policies like this.`;
        
    await (async () => {
        let pEmail = await cohere.generate({
            prompt: proEmailPrompt,
            model: "command-xlarge-nightly",
            temperature: 1.2,
            k: 500
        });
        pEmail = `Hello honorable Representative ${billSponsor}, I wanted to commend your sponsorship of ${billName}, as it has profound impacts on American society. ${pEmail.body.generations[0].text} Thank you for your service to the American people.${"\n"} Sincerely, ${"\n"} [your name]`;
        let aEmail = await cohere.generate({
            prompt: antiEmailPrompt,
            model: "command-xlarge-nightly",
            temperature: 1.2,
            k: 500
        });
        aEmail = `Hello honorable Representative ${billSponsor}, I wanted to voice my opposing viewpoint to this legislation, seeing that you are the sponsor of ${billName}, and I felt the imperative to reach out to my elected officials and dissuade policies like this. ${aEmail.body.generations[0].text} Thank you for your service to the American people, and I hope I can make a change in this country.${"\n"} Sincerely, ${"\n"} [your name]`;
        // const response = await JSON.stringify({proEmail: pEmail, antiEmail: aEmail});
        // console.log(response);
        res.status(200).json({proEmail: pEmail, antiEmail: aEmail});
    })();
    }
}