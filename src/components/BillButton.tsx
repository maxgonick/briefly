import { Box, Card, Link, Typography } from '@mui/joy';
import { useState, useEffect } from "react";

export default function BillButton(props:{billDescription: string, billTitle: string, billID: number, billNumber: string}) {
    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                color: 'red',
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
                        {props.billNumber}: {props.billTitle}
                    </Link>
                </Typography>
                <Typography>
                    {props.billDescription}
                </Typography>
            </Box>
        </Card>
    );
}