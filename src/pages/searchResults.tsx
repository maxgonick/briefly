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
  const router = useRouter();
  const routerQuery = router.query;
  let keywords = routerQuery[Object.keys(routerQuery)[0]];
  const stateFromRoute = routerQuery[Object.keys(routerQuery)[1]];
  const [localState, setLocalState] = useState(stateFromRoute);

  const [results, setResults] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = keywords;
      const searchData = await fetch(
        `/api/billsForText?state=${localState}&query=${query}`
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
  }, [keywords, localState]);

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
      <Header callback={setLocalState} />
      <div className={`${styles.main} flex-grow`}>
        <div className={styles.middle}>
          {/* Left side */}
          <div className={styles.left}>
            <Box className={styles.list}>
              <FixedSizeList
                style={{ marginTop: 10 }}
                height={800}
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
