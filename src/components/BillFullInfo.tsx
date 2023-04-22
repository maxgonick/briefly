import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function BillFullInfo(props:{billName: string, billStatus: string, billDate: string, billSponsor: string, billCommittee: string, billSummary: string}){
    return (
        <div className = "flex flex-col">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 36, marginLeft: 2}}>
            {props.billName}
            </Typography>
            <Box
                sx={{
                    margin: 1,
                    width: 0.5,
                    backgroundColor: 'primary.dark',
                    borderRadius: 10,
                    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
                    flexGrow: 1
                }}
                >
                <div>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 24, textIndent: 1, width: 0.5, flex:1, padding: 2}}>
                        <p className = "break-words">Summary: {props.billSummary}<br/></p>
                    </Typography>
                </div>
            </Box>
            <Box
                sx={{
                    margin: 1,
                    width: 0.5,
                    backgroundColor: 'primary.dark',
                    borderRadius: 10,
                    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
                    flexGrow: 1
                }}
                >
                <div className = "flex flex-row">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 24, textIndent: 1, width: 0.5, flex:1, padding: 2}}>
                        <p className = "break-words">Status: {props.billStatus}<br/></p>
                        <p><br/></p>
                        <p className = "break-words">Date: {props.billDate}<br/></p>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 24, textIndent: 1, width: 0.5, flex:1, padding: 2}}>
                        <p className = "break-words">Sponsor: {props.billSponsor}<br/></p>
                        <p><br/></p>
                        <p className = "break-words">Committee: {props.billCommittee}<br/></p>
                    </Typography>
                </div>
            </Box>
        </div>
    )
};
