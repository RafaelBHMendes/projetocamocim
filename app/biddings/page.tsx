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
  publicationDate: string;
  dispenseDate: string;
  opening: string;
  file: undefined;
  Url: string;
  modality: "Dispensa" | "Pregão" | "Concurso" | "Credenciamento";
}

const LicitacoesPage: React.FC = () => {
  const [biddings, setBiddings] = useState<Bidding[]>([]);
  const [filteredBiddings, setFilteredBiddings] = useState<Bidding[]>([]);
  const [activeButton, setActiveButton] = useState<
    "Avisos" | "Licitações" | "Dispensas"
  >("Avisos");

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

  useEffect(() => {
    filterBiddings();
  }, [activeButton, biddings]);

  const handleButtonClick = (
    buttonType: "Avisos" | "Licitações" | "Dispensas"
  ) => {
    setActiveButton(buttonType);
  };

  const filterBiddings = () => {
    if (activeButton === "Avisos") {
      setFilteredBiddings(biddings);
    } else if (activeButton === "Dispensas") {
      setFilteredBiddings(
        biddings.filter((bidding) => bidding.modality === "Dispensa")
      );
    } else {
      setFilteredBiddings(
        biddings.filter((bidding) => bidding.modality !== "Dispensa")
      );
    }
  };

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
      <div className="flex justify-between items-center text-white bg-slate-800 p-4">
        <div className="text-lg font-semibold"> {activeButton}</div>
        <div className="flex gap-4">
          <button
            onClick={() => handleButtonClick("Avisos")}
            className={`bg-blue-600 hover:bg-blue-700 text-sm font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out ${
              activeButton === "Avisos" ? "active-class" : ""
            }`}
          >
            Todas as Licitações
          </button>
          <button
            onClick={() => handleButtonClick("Licitações")}
            className={`bg-blue-600 hover:bg-blue-700 text-sm font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out ${
              activeButton === "Licitações" ? "active-class" : ""
            }`}
          >
            Licitações
          </button>
          <button
            onClick={() => handleButtonClick("Dispensas")}
            className={`bg-blue-600 hover:bg-blue-700 text-sm font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out ${
              activeButton === "Dispensas" ? "active-class" : ""
            }`}
          >
            Avisos Lei Nº 14.133 - Dispensas
          </button>
        </div>
      </div>

      <Filters onSearch={handleSearch} />
      <BiddingsTable biddings={filteredBiddings} />
    </div>
  );
};

export default LicitacoesPage;
