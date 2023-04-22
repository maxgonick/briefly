import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import Header from "@/components/Header";
import styles from "@/styles/Navbar.module.css";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import Footer from '@/components/Footer'
import EmailCallTabs from '@/components/EmailCallTabs'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [state, setState] = useState<string>("");

  const handleChange = (event: any) => {
    setState(event.target.value as string);
  };

  return (
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
          <div>WORK</div>
        </div>
        {/* Right side */}
      </div>
    </div>
  );
}
