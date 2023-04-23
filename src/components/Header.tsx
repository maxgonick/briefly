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
            <SearchBar />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
