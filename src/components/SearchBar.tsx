import React from 'react';
import {TextField} from '@mui/material';
const SearchBar = () => {
    return(
        <TextField
            variant="outlined"
            sx={{ 
                input: { 
                backgroundColor: 'white',
                borderRadius: 30 // set the border radius value as desired
                },
                '& .MuiOutlinedInput-root': {
                borderRadius: 30 // set the border radius value for the TextField's outline
                }
            }} 
        />
    );
};

export default SearchBar;