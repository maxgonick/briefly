import { Box, Card, Link, Typography } from "@mui/joy";
import { useState, useEffect } from "react";

export default function BillButton(props: {
  billDescription: string;
  billTitle: string;
  billID: number;
  billNumber: string;
}) {
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        color: "red",
        width: 400,
        height: 150,
        gap: 2,
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
    >
      <Box flex-direction="column">
        <Typography fontSize="medium">
          <Link
            overlay
            underline="none"
            href=""
            sx={{
              color: "black",
              display: "-webkit-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.billNumber}: {props.billTitle}
          </Link>
        </Typography>
        <Typography
          fontSize={12}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {props.billDescription}
        </Typography>
      </Box>
    </Card>
  );
}
