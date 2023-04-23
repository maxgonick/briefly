import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {TextField, Toolbar, AppBar, Box, Typography, Button, IconButton} from '@mui/material';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            Briefly
          </Typography>
            <SearchBar/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

