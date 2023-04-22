import * as React from 'react';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import {TextField, Toolbar, AppBar, Box, Typography, Button, IconButton} from '@mui/material';
import SearchBar from './SearchBar';

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <div style = {{display:'flex', flexDirection:'row', justifyContent:'center', width:'100%'}}>
            <Link href="/">About Us</Link>
          </div>
          {/* <Typography variant="h6" align = "center" component="div" sx={{ flexGrow: 1 }}>
            |
          </Typography> */}

          {/* <Typography variant="h6" align = "right" component="div" sx={{ flexGrow: 1 }} >
            Briefly
          </Typography>
          <Typography variant="h6" align = "center" component="div" sx={{ flexGrow: 1 }}>
            Briefly2
          </Typography>
          <Typography variant="h6" align = "left" component="div" sx={{ flexGrow: 1 }}>
            Briefly3
          </Typography> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

