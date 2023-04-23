import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BillFullInfo from "@/components/BillFullInfo";
import EmailCallTabs from "@/components/EmailCallTabs";

import { useRouter } from "next/router";
type Props = {};

function intToStatus(inp: string) {
  const conversionTable = {
    0: "N/A",
    1: "Introduced",
    2: "Engrossed",
    3: "Enrolled",
    4: "Passed",
    5: "Vetoed",
    6: "Failed",
    7: "Override",
    8: "Chaptered",
    9: "Refer",
    10: "Report Pass",
    11: "Report DNP",
    12: "Draft",
  };
  return conversionTable[inp];
}

const Bill = (props: Props) => {
  const router = useRouter();
  const data = router.query.billId;
  const [billObj, setbillObj] = useState({
    name: "Loading...",
    status: "",
    date: "",
    sponsor: "",
    committee: "",
    summary: "",
    proEmail: "Generating...",
    antiEmail: "Generating...",
  });
  // const [emailObj, setEmailObj] = useState({
  //   email: "",
  //   number: "",
  // });
  useEffect(() => {
    const fetchData = async (billId: string) => {
      console.log("I am run");
      if (billId) {
        const result = await fetch(`/api/getBill?id=${billId}`);
        const resultJson = await result.json();
        const docId = resultJson.bill.texts[resultJson.bill.texts.length-1].doc_id;
        const emails = await fetch(`/api/writeEmail?name=${resultJson.bill.title}&sponsor=${resultJson.bill.sponsors[0].name}`);
        const emailsJson = await emails.json();
        console.log(emailsJson);
        console.log(Object.keys(emailsJson))
        const summaryResult = await fetch(
          `/api/summarizeBill?id=${docId}`
        );
        const summaryResultJSON = await summaryResult.json();
        setbillObj({
          name: resultJson.bill.title,
          status: intToStatus(
            resultJson.bill.progress[resultJson.bill.progress.length - 1].event
          ),
          date: resultJson.bill.status_date,
          sponsor: resultJson.bill.sponsors
            .map((obj) => {
              return obj.name;
            })
            .join(", "),
          committee: resultJson.bill.committee.name,
          summary: summaryResultJSON.body.summary,
          proEmail: emailsJson.proEmail,
          antiEmail: emailsJson.antiEmail,
        });
        


        
        // const emailsJSON = await emails.json();
        // setEmailObj({
        //   email: emailsJSON.email,
        //   number: emailsJSON.number,
        // });
      }
    };
    fetchData(data);
  }, [data]);




  return (
    <div>
      <Header />
      <div className="flex flex-row w-auto justify-evenly">
        <div className="w-1/2 p-3">
          <BillFullInfo
            billName={billObj.name}
            billStatus={billObj.status}
            billDate={billObj.date}
            billSponsor={billObj.sponsor}
            billCommittee={billObj.committee}
            billSummary={billObj.summary}
          />
        </div>
        <div className="w-1/2 p-3 mr-3">
          <EmailCallTabs
            email= {billObj.proEmail}
            number= {billObj.antiEmail}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bill;
