
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
import EmailCallTabs from "./components/EmailCallTabs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [state, setState] = useState<string>("");

  const handleChange = (event: any) => {
    setState(event.target.value as string);
  };

  const renderRow = (props: ListChildComponentProps) => {
    const { index, style } = props;
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={`Item ${index + 1}`} />
        </ListItemButton>
      </ListItem>
    );
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   const state = 'WV';
    //   const data = await fetch(`/api/billsForState?state=${state}`);
    //   const query = 'medical freedom';
    //   const searchData = await fetch(`/api/billsForText?state=${state}&query=${query}`);
    //   const searchDataJson = await searchData.json();
    //   const dataJson = await data.json();
    //   if(data.status >= 400){
    //     console.log(dataJson['message']);
    //   } else {
    //     console.log(dataJson);
    //   }
    //   if(searchData.status >= 400){
    //     console.log(searchDataJson['message']);
    //   } else {
    //     console.log(searchDataJson);
    //   }
    // }
    // fetchData();
  });
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
                >
                  <MenuItem value="CA">CA</MenuItem>
                  <MenuItem value="FL">FL</MenuItem>
                  <MenuItem value="WC">WV</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Box className={styles.list}>
              <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={200}
              >
                {renderRow}
              </FixedSizeList>
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
