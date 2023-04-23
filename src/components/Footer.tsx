import * as React from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import {
  TextField,
  Toolbar,
  AppBar,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import SearchBar from "./SearchBar";

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="static" style={{backgroundColor: "#5EB1DE"}}>
        <Toolbar>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Link href="/">Back</Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
