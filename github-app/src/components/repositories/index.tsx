import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export interface Repository {
  name: string;
  full_name: string;
  language: string;
}

interface RepositoriesProps {
  repos?: Repository[];
  starred?: Repository[];
}

export const Repositories = ({
  repos = [],
  starred = [],
}: RepositoriesProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box data-testid="repositories" sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Repositories" {...a11yProps(0)} />
          <Tab label="Starred" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {repos.map((repo) => (
          <Box key={repo.full_name} sx={{ p: 3 }}>
            <Typography variant="h6">{repo.name}</Typography>
            <Typography variant="body2">{repo.full_name}</Typography>
            <Typography variant="body2">{repo.language}</Typography>
          </Box>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {starred.map((repo) => (
          <Box key={repo.full_name} sx={{ p: 3 }}>
            <Typography variant="h6">{repo.name}</Typography>
            <Typography variant="body2">{repo.full_name}</Typography>
            <Typography variant="body2">{repo.language}</Typography>
          </Box>
        ))}
      </TabPanel>
    </Box>
  );
};
