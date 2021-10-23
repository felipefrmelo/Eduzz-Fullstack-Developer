import { Box } from "@mui/system";
import React from "react";
import { Search } from "..";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <Box sx={{ padding: 2 }} className="App">
      <Box component="header">
        <Search onSearch={() => {}} />
      </Box>
      <main>{children}</main>
    </Box>
  );
};
