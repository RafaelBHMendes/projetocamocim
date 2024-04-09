"use client";

// Import useState and use it to hold the state of the search field
import { useState } from "react";

const Filters: React.FC<{ onSearch: (term: string) => void }> = ({
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="flex gap-4 p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquisar"
        className="border p-2 rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Pesquisar
      </button>
      <button
        onClick={handleClear}
        className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
      >
        Limpar
      </button>
    </div>
  );
};

export default Filters;
