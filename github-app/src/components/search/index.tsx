import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

export const Search = ({ onSearch }: Props) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClick = () => {
    onSearch(query);
  };

  return (
    <Box sx={{ display: "flex" }} alignItems="center" role="search">
      <TextField
        id="outlined-uncontrolled"
        placeholder="Username"
        onChange={handleChange}
        label="Username"
        size="small"
        fullWidth
      />
      <Box ml={1}>
        <Button type="button" variant="contained" onClick={handleClick}>
          Buscar
        </Button>
      </Box>
    </Box>
  );
};
