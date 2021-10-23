import { Box } from "@mui/system";
import React from "react";

import { Search } from "..";

interface Props {
  children: React.ReactNode;
  onSearch: (query: string) => void;
}

export const Layout = ({ children, onSearch }: Props) => {
  return (
    <Box sx={{ padding: 2 }} className="App">
      <Box component="header">
        <Search onSearch={onSearch} />
      </Box>
      <main>{children}</main>
    </Box>
  );
};
