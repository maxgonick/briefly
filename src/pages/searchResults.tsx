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
