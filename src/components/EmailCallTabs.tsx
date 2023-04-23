import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography sx = {{color: "362419", fontSize: 18, textTransform: "none"}}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function EmailCallTabs(props: {forEmail: React.ReactComponentElement, againstEmail: React.ReactComponentElement}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' , color: "#362419"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{style: {background:'#5EB1DE'}}}>
          <Tab label="Email Template For" sx = {{color: "#362419", fontSize: 24, textTransform: "none", width: 1/2 }} {...a11yProps(0)} />
          <Tab label="Email Template Against" sx = {{color: "#362419", fontSize: 24, textTransform: "none", width: 1/2}} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {props.forEmail}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.againstEmail}
      </TabPanel>
    </Box>
  );
}
