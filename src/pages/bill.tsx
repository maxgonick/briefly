import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BillFullInfo from "@/components/BillFullInfo";
import EmailCallTabs from "@/components/EmailCallTabs";
import { Typography } from "@mui/material";
import Email from "@/components/Email";

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
  console.log(data);
  const [billObj, setbillObj] = useState({
    name: "Loading...",
    status: "",
    number: "",
    date: "",
    sponsor: "",
    committee: "",
    summary: "",
  });
  useEffect(() => {
    const fetchData = async (billId: string) => {
      console.log("I am run");
      if (billId) {
        const result = await fetch(`/api/getBill?id=${billId}`);
        const resultJson = await result.json();
        // const docId = resultJson.bill.texts[resultJson.bill.texts.length-1].doc_id;
        // console.log(docId);
        // const summaryResult = await fetch(
        //   `/api/summarizeBill?id=${docId}`
        // );
        // const summaryResultJSON = await summaryResult.json();
        // console.log(summaryResultJSON);
        setbillObj({
          name: resultJson.bill.title,
          status: intToStatus(
            resultJson.bill.progress[resultJson.bill.progress.length - 1].event
          ),
          date: resultJson.bill.status_date,
          number: resultJson.bill.bill_number,
          sponsor: resultJson.bill.sponsors
            .map((obj) => {
              return obj.name;
            })
            .join(", "),
          committee: resultJson.bill.committee.name,
          summary: resultJson.bill.description// summaryResultJSON.body.summary,
        });
      }
    };
    fetchData(data);
  }, [data]);

  return (
    <div>
      <Header callback={()=>{}}/>
      <div className="text-center mt-5">
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontSize: 36, marginLeft: 2, color: "#362419" }}
        >
          {billObj.number + ': ' + billObj.name}
        </Typography>
      </div>
      <div className="flex  w-auto justify-evenly">
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
            forEmail={
              <Email
                emailSubject={`Support for ${
                  billObj.number + ": " + billObj.name
                }`}
                emailBody="generated text"
              />
            }
            againstEmail={
              <Email
                emailSubject={`Opposition to ${
                  billObj.number + ": " + billObj.name
                }`}
                emailBody="generated text"
              />
            }
          />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Bill;
