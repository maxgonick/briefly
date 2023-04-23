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

export default function Header() {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="static" style={{backgroundColor: "#5EB1DE"}}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">Briefly.</Link>
          </Typography>
          <SearchBar />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
