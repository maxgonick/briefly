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
  });
  useEffect(() => {
    const fetchData = async (billId: string) => {
      console.log("I am run");
      console.log(billId);
      if (billId) {
        const result = await fetch(`/api/getBill?id=${billId}`);
        const resultJson = await result.json();

        const summaryResult = await fetch(
          `/api/summarizeBill?input=${resultJson.bill.description}`
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
          summary: summaryResultJSON.summary,
        });
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
            email="Dear Senator Schumer, I am writing to commend you for your leadership in championing the Infrastructure Investment and Jobs Act. As a constituent who cares deeply about the state of our country's infrastructure, I believe this bill is urgently needed to create jobs, modernize our transportation systems, and invest in critical infrastructure like broadband, clean drinking water, and more. The investments outlined in this bill are sorely needed, and I am grateful that you and your colleagues in the Senate have taken action to address this pressing issue. I urge you to continue your efforts to ensure that this bill becomes law, and I will be closely following its progress in the House of Representatives. Thank you for your dedication to improving our country's infrastructure, and for your commitment to creating jobs and improving the lives of Americans. Sincerely, [Your Name]"
            number="insertPhoneNo"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bill;
