import { Box, Typography } from "@mui/material";
import { Typewriter } from "react-simple-typewriter";

export default function Blurb() {
  const typeStrings = ["environment.", "communities.", "home."];
  return (
    <Box flex-direction="column">
      <Typography
        variant="h1"
        sx={{
          fontWeight: 500,
        }}
      >
        Briefly.
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 300,
        }}
      >
        We care about our{" "}
        <Typewriter
          words={typeStrings}
          loop={0}
          cursor
          cursorStyle="|"
          cursorBlinking={true}
        />
      </Typography>
    </Box>
  );
}
