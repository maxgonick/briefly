import { Box, Card, Link, Typography } from '@mui/joy';
import { useState, useEffect } from "react";

export default function BillButton(billID: number) {
    //query bill info from bill ID here
    const [billName, setBillName] = useState("name");
    const [billDescription, setBillDescription] = useState("des or keywords");

    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                width: 400,
                height: 100,
                gap: 2,
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
        >
            <Box flex-direction= 'column'>
                <Typography fontSize="large">
                    <Link
                        overlay
                        underline="none"
                        href=""
                        sx={{ color: 'black' }}
                    >
                        {billName}
                    </Link>
                </Typography>
                <Typography>
                    {billDescription}
                </Typography>
            </Box>
        </Card>
    );
}