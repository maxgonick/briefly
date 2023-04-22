
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import styles from "@/styles/Index.module.css";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
} from "@mui/material";
import Footer from "@/components/Footer";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Blurb from "../components/Blurb"
import EmailCallTabs from "@/components/EmailCallTabs";
import BillButton from "@/components/BillButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [state, setState] = useState<string>('CA');
  const [results, setResults] = useState<any>([]);

  const renderRows = (props : ListChildComponentProps) => {
    const { index, style } = props;
    const shortList = results.slice(0, 20);

    // return (

          
          {shortList.map((bill : any) => {
            return ( 
              <ListItem style={style} key={index} component="div" disablePadding>
              <ListItemButton>
              <ListItemText primary={`Item ${index + 1}`} />
              <BillButton key={bill['id']} billTitle={bill['title']} billID={bill['id']} billName={bill['title']}/>
              </ListItemButton>
              </ListItem>
            );
          })
          }

    // );

  };

  useEffect(() => {
    console.log('runing');
    const fetchData = async () => {
      const data = await fetch(`/api/billsForState?state=${state}`);
      const dataJson = await data.json();
      if(data.status >= 400){
        console.log(dataJson['message']);
      } else {
        setResults(dataJson);
      }
    }
    fetchData();
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
                  onChange={(event) => {setState(event.target.value as string);}}
                >
                  <MenuItem value="CA">CA</MenuItem>
                  <MenuItem value="FL">FL</MenuItem>
                  <MenuItem value="WC">WV</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Box className={styles.list}>
              {/* <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={200}
              > */}
            {results.map((bill : any) => {
              return ( 
                <ListItem key={bill['id']} component="div" disablePadding>
                  <ListItemButton>
                    <BillButton key={bill['id']} billTitle={bill['number']} billID={bill['id']} billName={bill['title']}/>
                  </ListItemButton>
                </ListItem>
              );
            })
            }
              {/* </FixedSizeList> */}
            </Box>
          </div>
          {/* <Blurb /> */}
          {/* Right side */}
        </div>
        <Footer/>
      </div>
    </>

  );
}
