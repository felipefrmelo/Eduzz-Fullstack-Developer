import { Tabs, Tab as TabMui, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabProp {
  label: string;
  children: React.ReactNode;
}

export interface TabProps {
  tabs: TabProp[];
}

export const Tab = ({ tabs }: TabProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Tabs value={value} onChange={handleChange}>
          {tabs.map((tab, index) => (
            <TabMui key={tab.label} label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>
        <Divider />
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel key={tab.label} value={value} index={index}>
          {tab.children}
        </TabPanel>
      ))}
    </>
  );
};
