import React from "react";
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import Link from "next/link";
import { useGlobalStateContext } from "@/context";

const SearchBar = () => {
  const [keywords, setKeywords] = useState("");
  const {state} =  useGlobalStateContext();


  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  return (
    <div>
      <Box
        sx={{
          marginLeft: 5,
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <TextField
          variant="outlined"
          sx={{
            input: {
              height: "10px",
              backgroundColor: "#FAF9F6",
              borderRadius: 3,
              width: 300,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
          placeholder="Search for keywords..."
          onChange={handleKeywordChange}
        />
        <Button
          sx={{
            width: 90,
            padding: 0.5,
            margin: 2,
            borderRadius: 2,
            "& .MuiButtonContained": { textTransform: 'none' },
          }}
          style={{
            backgroundColor: "#156CCA",
            color: "white",
            textTransform: 'none',
          }}
        >
          <Link
            href={{
              pathname: "/searchResults",
              query: { keywords, state},
            }}
          >
            search
          </Link>
        </Button>
      </Box>
    </div>
  );
};

export default SearchBar;
