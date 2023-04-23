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
  ListItemText,
  Box,
} from "@mui/material";
import Footer from "@/components/Footer";
import {
  FixedSizeList,
  ListChildComponentProps,
  VariableSizeList,
} from "react-window";
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
  const { state } = useGlobalStateContext();
  const [localState, setLocalState] = useState(state);
  const [loading, setLoading] = useState<boolean>(false);

  const renderRow = (props: ListChildComponentProps) => {
    const { index, style } = props;
    const bill = results[index];
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
        <ListItem style={style} key={bill["id"]} component="div" disablePadding>
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
      setLoading(true);
      const data = await fetch(`/api/billsForState?state=${localState}`);
      const dataJson = await data.json();
      if (data.status >= 400) {
        console.log(dataJson["message"]);
      } else {
        setResults(dataJson);
      }
      setLoading(false);
    };
    fetchData();
  }, [localState]);
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className={styles.main}>
          <Box
            sx={{
              width: 600,
              height: 325,
              backgroundColor: "#FFFEF2",
              boxShadow: 15,
              alignSelf: "center",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "2rem",
              borderRadius: "30px",
            }}
          >
            <Blurb />
          </Box>
          <div className="mt-[100px]">
            <div className={`${styles.arrow} ${styles.arrowfirst}`}></div>
            <div className={`${styles.arrow} ${styles.arrowsecond}`}></div>
          </div>
        </div>
      </div>

      <div className="h-screen flex flex-col justify-between content-center">
        <Header callback={setLocalState}/>
        <Box className="flex flex-row justify-center">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <FixedSizeList
              style={{marginTop: 10}}
              height={800}
              width={800}
              itemSize={160}
              itemCount={results.length}
            >
              {renderRow}
            </FixedSizeList>
          )}
        </Box>
      </div>
    </>
  );
}
