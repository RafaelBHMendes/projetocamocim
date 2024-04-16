"use client";

import { useEffect, useState } from "react";

import Breadcrumbs from "../biddings/components/Breadcrumbs";
import Filters from "../biddings/components/filters";
import BiddingsTable from "../biddings/components/BiddingsTable";
import supabase from "../lib/supabase";

// Define your Bidding interface based on the expected shape of your data
interface Bidding {
  id: number;
  processNumber: string;
  object: string;
  date: string;
  opening: string;
  file: undefined;
}

const LicitacoesPage: React.FC = () => {
  const [biddings, setBiddings] = useState<Bidding[]>([]);
  const [filteredBiddings, setFilteredBiddings] = useState<Bidding[]>([]);

  useEffect(() => {
    // Função atualizada para buscar licitações da Supabase
    const fetchBiddings = async () => {
      const { data, error } = await supabase
        .from("bidding") // Substitua pelo nome correto da sua tabela
        .select("*");
      if (error) {
        console.error("Erro ao buscar licitações: ", error);
        return;
      }

      // Atualize o estado com os dados recebidos do Supabase
      setBiddings(data || []); // Utilize 'data || []' para evitar atribuir 'null'
      setFilteredBiddings(data || []);
    };

    fetchBiddings();
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
