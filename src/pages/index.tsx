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
  const { state, setState } = useGlobalStateContext();
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
      const data = await fetch(`/api/billsForState?state=${state}`);
      const dataJson = await data.json();
      if (data.status >= 400) {
        console.log(dataJson["message"]);
      } else {
        setResults(dataJson);
      }
      setLoading(false);
    };
    fetchData();

    console.log("THIS IS THE STATE:   ", state);
  }, [state]);
  return (
    <>
      <div className="flex flex-col h-screen">
        {/* <Header /> */}
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

      {/* Second Part */}
      <div className="h-screen flex flex-col justify-center content-center mx-4">
        <div>
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
                <MenuItem value="AL">AL</MenuItem>
                <MenuItem value="AK">AK</MenuItem>
                <MenuItem value="AZ">AZ</MenuItem>
                <MenuItem value="AR">AR</MenuItem>
                <MenuItem value="CA">CA</MenuItem>
                <MenuItem value="CO">CO</MenuItem>
                <MenuItem value="CT">CT</MenuItem>
                <MenuItem value="DE">DE</MenuItem>
                <MenuItem value="FL">FL</MenuItem>
                <MenuItem value="GA">GA</MenuItem>
                <MenuItem value="HI">HI</MenuItem>
                <MenuItem value="ID">ID</MenuItem>
                <MenuItem value="IL">IL</MenuItem>
                <MenuItem value="IN">IN</MenuItem>
                <MenuItem value="IA">IA</MenuItem>
                <MenuItem value="KS">KS</MenuItem>
                <MenuItem value="KY">KY</MenuItem>
                <MenuItem value="LA">LA</MenuItem>
                <MenuItem value="ME">ME</MenuItem>
                <MenuItem value="MD">MD</MenuItem>
                <MenuItem value="MA">MA</MenuItem>
                <MenuItem value="MI">MI</MenuItem>
                <MenuItem value="MN">MN</MenuItem>
                <MenuItem value="MS">MS</MenuItem>
                <MenuItem value="MO">MO</MenuItem>
                <MenuItem value="MT">MT</MenuItem>
                <MenuItem value="NE">NE</MenuItem>
                <MenuItem value="NV">NV</MenuItem>
                <MenuItem value="NH">NH</MenuItem>
                <MenuItem value="NJ">NJ</MenuItem>
                <MenuItem value="NM">NM</MenuItem>
                <MenuItem value="NY">NY</MenuItem>
                <MenuItem value="NC">NC</MenuItem>
                <MenuItem value="ND">ND</MenuItem>
                <MenuItem value="OH">OH</MenuItem>
                <MenuItem value="OK">OK</MenuItem>
                <MenuItem value="OR">OR</MenuItem>
                <MenuItem value="PA">PA</MenuItem>
                <MenuItem value="RI">RI</MenuItem>
                <MenuItem value="SC">SC</MenuItem>
                <MenuItem value="SD">SD</MenuItem>
                <MenuItem value="TN">TN</MenuItem>
                <MenuItem value="TX">TX</MenuItem>
                <MenuItem value="UT">UT</MenuItem>
                <MenuItem value="VT">VT</MenuItem>
                <MenuItem value="VA">VA</MenuItem>
                <MenuItem value="WA">WA</MenuItem>
                <MenuItem value="WV">WV</MenuItem>
                <MenuItem value="WI">WI</MenuItem>
                <MenuItem value="WY">WY</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Box className="flex flex-row justify-center">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <FixedSizeList
                height={400}
                width={800}
                itemSize={160}
                itemCount={results.length}
              >
                {renderRow}
              </FixedSizeList>
            )}
          </Box>
        </div>
      </div>
    </>
  );
}
