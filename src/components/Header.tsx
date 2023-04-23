import * as React from "react";
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Briefly
          </Typography>
          <SearchBar />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
