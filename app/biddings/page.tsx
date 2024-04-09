"use client";

import { useState } from "react";

import Breadcrumbs from "../biddings/components/Breadcrumbs";
import Filters from "../biddings/components/filters";
import BiddingsTable from "../biddings/components/BiddingsTable";

const mockBiddings = [
  // Populate with mock data
  {
    processNumber: "1910.01/2023",
    object: "Publicação...",
    date: "16/11/2023",
    opening: "Aberta",
  },
  // More entries...
];

const LicitacoesPage: React.FC = () => {
  const [biddings, setBiddings] = useState(mockBiddings);
  const [filteredBiddings, setFilteredBiddings] = useState(mockBiddings);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredBiddings(mockBiddings);
      return;
    }

    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = biddings.filter((item) => {
      // Check if searchTerm is in any of the object's values (assuming they are strings)
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(lowercasedFilter)
      );
    });

    setFilteredBiddings(filteredData);
  };

  return (
    <div>
      <Breadcrumbs />
      <Filters onSearch={handleSearch} />
      <BiddingsTable biddings={filteredBiddings} />
    </div>
  );
};

export default LicitacoesPage;
