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
        width: 800,
        height: 150,
        gap: 2,
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
    >
      <Box flex-direction="column">
        <Typography fontSize="large">
          <Link
            overlay
            underline="none"
            href={`/bill?billId=${props.billID}`}
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
          fontSize={14}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
        >
          {props.billDescription}
        </Typography>
      </Box>
    </Card>
  );
}