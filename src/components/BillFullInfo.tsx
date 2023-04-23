import * as React from "react";
import { Typography, Box } from "@mui/material";
import cohere from '../../public/cohere.svg';
import Image from 'next/image'
export default function BillFullInfo(props: {
  billName: string;
  billStatus: string;
  billDate: string;
  billSponsor: string;
  billCommittee: string;
  billSummary: string;
}) {
  return (
    <div className="flex flex-col">
      <Box
        sx={{
          margin: 1,
          width: 1,
          backgroundColor: "#FAF9F6",
          borderRadius: 2,
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
          flexGrow: 1,
        }}
      >
        <div>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: 24,
              textIndent: 1,
              flex: 1,
              padding: 2,
              color: "#362419"
            }}
          >
            <p className="break-words">
              Summary: {props.billSummary}
              <br />
            </p>
          </Typography>
        </div>
        <Image src={cohere} alt="" style={{marginLeft: 'auto'}}/>
      </Box>
      <Box
        sx={{
          margin: 1,
          marginTop: 5,
          width: 1,
          backgroundColor: "#FAF9F6",
          borderRadius: 2,
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: 24,
            textIndent: 1,
            flex: 1,
            padding: 2,
            color: "#362419"
          }}
        >
          <div className="flex flex-row">
            <p className="break-words mr-10">
              Status: {props.billStatus}
              <br />
            </p>
            <p>
            </p>
            <p className="break-words ml-10">
              Date: {props.billDate}
              <br />
            </p>
          </div>
        </Typography>


        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: 24,
            textIndent: 1,
            flex: 1,
            padding: 2,
            color: "#362419"
          }}
        >
          <p className="break-words">
            Sponsors: {props.billSponsor}
            <br />
          </p>
          <p>
            <br />
          </p>
          <p className="break-words">
            Committee: {props.billCommittee}
            <br />
          </p>
        </Typography>
      </Box>
    </div>
  );
}
