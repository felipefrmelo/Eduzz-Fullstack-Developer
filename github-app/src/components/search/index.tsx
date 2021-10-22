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
    <div>
      <input onChange={handleChange} type="text" placeholder="Username" />
      <button type="button" onClick={handleClick}>
        Buscar
      </button>
    </div>
  );
};
