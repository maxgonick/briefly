import React from 'react';
import { useState, useEffect} from 'react';
import {TextField, Button, Box} from '@mui/material';
const SearchBar = () => {
    const [keywords, setKeywords] = useState("");

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setKeywords(e.target.value);
        console.log(keywords);
    };

    const searchButtonHandler = (e: React.MouseEvent<HTMLElement>) =>{
        console.log("clicked");
    };

    return(
        <Box 
            sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100%'
            }}
        >

            <TextField
                variant="outlined"
                sx={{ 
                    input: { 
                    height: "10px",
                    backgroundColor: 'white',
                    borderRadius: 20 // set the border radius value as desired
                    },
                    '& .MuiOutlinedInput-root': {
                    borderRadius: 20 // set the border radius value for the TextField's outline
                    }
                }} 
                onChange={handleKeywordChange}
            />
            <Button 
                color="inherit" 
                onClick={searchButtonHandler}
                sx={{ width: 60, padding: .5, margin: 2 }}
            >
                search
            </Button>
        </Box>

    );
};

export default SearchBar;