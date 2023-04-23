import * as React from "react";
import Link from "next/link";
import {
  Toolbar,
  AppBar,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Box,
} from "@mui/material";
import styles from "@/styles/Index.module.css";
import { GlobalStateProvider, useGlobalStateContext } from "../context";
import SearchBar from "./SearchBar";

export default function Header(props:{callback: any}) {
  return (
    <GlobalStateProvider>
      <HeaderMini callback={props.callback}/>
    </GlobalStateProvider>
  );
}
function HeaderMini(props:{callback: any}) {
  const { state, setState } = useGlobalStateContext();

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <AppBar position="static" style={{ display: 'flex', backgroundColor: "#5EB1DE", padding: 4, justifyContent: 'center'}}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/">Briefly.</Link>
            </Typography>
            <div className={styles.hottestBills}>
              <FormControl className={styles.inputBox}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="State"
                  value={state}
                  onChange={(event) => {
                    setState(event.target.value as string);
                    props.callback(event.target.value as string);
                  }}
                  sx={{height: 40, borderRadius: 4}}
                  style={{backgroundColor: "#FAF9F6", height: 40, borderRadius: 4}}
                >
                  <MenuItem value="CA">CA</MenuItem>
                  <MenuItem value="FL">FL</MenuItem>
                  <MenuItem value="WV">WV</MenuItem>
                </Select>
              </FormControl>
            </div>
            <SearchBar />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
