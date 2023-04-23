import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect, useContext } from "react";
import Header from "@/components/Header";
import styles from "@/styles/Index.module.css";
import Link from "next/link";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  ListItem,
  ListItemButton,
  Box,
} from "@mui/material";
import Footer from "@/components/Footer";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Blurb from "../components/Blurb";
import EmailCallTabs from "@/components/EmailCallTabs";
import BillButton from "@/components/BillButton";

import { GlobalStateProvider, useGlobalStateContext } from "../context";


export default function HomeWrapper() {
  return (
    <GlobalStateProvider>
      <Home />
    </GlobalStateProvider>
  );
}

function Home() {
  const [results, setResults] = useState<any>([]);
  const { state, setState } = useGlobalStateContext();

  const renderRow = (props: ListChildComponentProps) => {
    const { index, style } = props;
    const bill = results[index];
    const listItemStyle = {
      ...style,
      marginBottom: "4px",
      marginTop: "4px",
    };
    if (!bill) return null;
    return (
      <Link
        href={{
          pathname: "/bill",
          query: {
            billId: bill["bill_id"],
          },
        }}
      >
        <ListItem
          style={listItemStyle}
          key={bill["id"]}
          component="div"
          disablePadding
        >
        <ListItemButton>
          <BillButton
            key={bill["bill_id"]}
            billTitle={bill["title"]}
            billID={bill["bill_id"]}
            billDescription={bill["description"]}
            billNumber={bill["number"]}
          />
        </ListItemButton>
      </ListItem>
      </Link>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`/api/billsForState?state=${state}`);
      const dataJson = await data.json();
      if (data.status >= 400) {
        console.log(dataJson["message"]);
      } else {
        setResults(dataJson);
      }
    };
    fetchData();

    console.log("THIS IS THE STATE:   ", state);
  }, [state]);
  return (
    <>
      <div className={styles.main}>
        <Header />
        <div className={styles.middle}>
          {/* Left side */}
          <div className={styles.left}>
            <div className={styles.hottestBills}>
              <span>Hottest Bills in </span>
              <FormControl className={styles.inputBox}>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="State"
                  value={state}
                  onChange={(event) => {
                    setState(event.target.value as string);
                    console.log(event.target.value);
                  }}
                >
                  <MenuItem value="CA">CA</MenuItem>
                  <MenuItem value="FL">FL</MenuItem>
                  <MenuItem value="WV">WV</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Box className={styles.list}>
              <FixedSizeList
                height={400}
                width={360}
                itemSize={100}
                itemCount={results.length}
              >
                {renderRow}
              </FixedSizeList>
            </Box>
          </div>
          <Blurb />
        </div>
        <Link
          href={{
            pathname: "/bill",
            query: {
              billId: 123456,
            }, // the data
          }}
        >
          <h1>temporary button to access ./bill.tsx</h1>
        </Link>
        <Footer />
      </div>
    </>
  );
}
