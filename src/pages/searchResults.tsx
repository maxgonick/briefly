import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Select,
  InputLabel,
  MenuItem,
  ListItem,
  ListItemButton,
  TextField,
  FormControl,
  Box,
} from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import getBillFromKeywords from "./api/billsForText";
import styles from "@/styles/Index.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BillButton from "@/components/BillButton";
import { GlobalStateProvider, useGlobalStateContext } from "../context";
import Link from "next/link";

export default function SearchResultsWrapper() {
  return (
    <GlobalStateProvider>
      <SearchResults />
    </GlobalStateProvider>
  );
}
function SearchResults() {
  const { state, setState } = useGlobalStateContext();
  const router = useRouter();
  const routerQuery = router.query;
  let keywords = routerQuery[Object.keys(routerQuery)[0]];

  const [results, setResults] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = keywords;
      const searchData = await fetch(
        `/api/billsForText?state=${state}&query=${query}`
      );
      const searchDataJson = await searchData.json();
      if (searchData.status >= 400) {
        console.log(searchDataJson["message"]);
      } else {
        setResults(searchDataJson);
        console.log(searchDataJson);
      }
    };
    fetchData();
    console.log(keywords);
  }, [keywords, state]);

  const renderRow = (props: ListChildComponentProps) => {
    const { index, style } = props;
    const bill = results[index];
    console.log(bill);
    console.log(bill["title"]);
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
              billNumber={bill["bill_number"]}
            />
          </ListItemButton>
        </ListItem>
      </Link>
    );
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className={`${styles.main} flex-grow`}>
        <div className={styles.middle}>
          {/* Left side */}
          <div className={styles.left}>
            <div className={styles.hottestBills}>
              <FormControl className={styles.inputBox}>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="State"
                  value={state}
                  onChange={(event) => {
                    setState(event.target.value as string);
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
                width={800}
                itemSize={160}
                itemCount={results.length}
              >
                {renderRow}
              </FixedSizeList>
            </Box>
          </div>
          {/* <Blurb /> */}
          {/* Right side */}
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
