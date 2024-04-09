"use client";

import { useEffect, useState } from "react";

import Breadcrumbs from "../biddings/components/Breadcrumbs";
import Filters from "../biddings/components/filters";
import BiddingsTable from "../biddings/components/BiddingsTable";

// Define your Bidding interface based on the expected shape of your data
interface Bidding {
  id: number;
  processNumber: string;
  object: string;
  date: string;
  opening: string;
}

const LicitacoesPage: React.FC = () => {
  const [biddings, setBiddings] = useState<Bidding[]>([]);
  const [filteredBiddings, setFilteredBiddings] = useState<Bidding[]>([]);

  useEffect(() => {
    // Function to fetch biddings from the backend
    const fetchBiddings = async () => {
      const response = await fetch("/api/biddings"); // Update this URL to wherever your API endpoint is
      const data: Bidding[] = await response.json();
      setBiddings(data);
      setFilteredBiddings(data);
    };

    fetchBiddings().catch(console.error); // Log the error if the fetch fails
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredBiddings(biddings);
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
