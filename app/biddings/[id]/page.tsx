"use client";

import React, { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import pdf from "../../../public/pdf.svg";
import Image from "next/image";

interface BiddingDetails {
  id: number;
  processNumber: string;
  object: string;
  publicationDate: string;
  dispenseDate: string;
  opening: string;
  file: string;
  Url: string;
}

const BiddingDetailsPage: React.FC = () => {
  const [biddingDetails, setBiddingDetails] = useState<BiddingDetails | null>(
    null
  );

  useEffect(() => {
    const fetchBiddingDetails = async () => {
      const pathSegments = window.location.pathname.split("/");
      const id = pathSegments[pathSegments.length - 1];

      const { data, error } = await supabase
        .from("bidding")
        .select("*")
        .eq("id", parseInt(id))
        .single();

      if (error) {
        console.error("Erro ao buscar detalhes da licitação:", error);
        return;
      }
      setBiddingDetails(data);
    };

    fetchBiddingDetails();
  }, []);

  if (!biddingDetails) {
    return <p>Carregando detalhes da licitação...</p>;
  }

  // Exemplo de caminho para o seu arquivo SVG
  const pdfSvgPath = "/path/to/your/pdf-icon.svg";

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">
          Processo Nº: {biddingDetails.processNumber}
        </h1>
      </div>

      <div className="mb-4">
        <p>Data fim: {biddingDetails.dispenseDate}</p>

        <p>Portal dos terceiros: M2A TECNOLOGIA</p>
      </div>

      <div className="mb-4">
        <h2 className="font-bold text-lg">Informações do Objeto:</h2>
        <p>{biddingDetails.object}</p>
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-lg">Link</h2>
        <div className="break-words">
          <a
            href={biddingDetails.Url}
            className="text-blue-600 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-gray-600 hover:text-blue-800 mt-1">
              {biddingDetails.Url}
            </p>
          </a>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-bold text-lg">ARQUIVOS DISPONÍVEIS</h2>
        <div className="flex items-center mt-2">
          <a
            href={biddingDetails.file}
            className="inline-flex items-center  hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={pdf} alt="PDF icon" className="h-6 w-6 mr-2" />{" "}
            {/* Utilize seu SVG de PDF aqui */}
            EDITAL_20240418001.PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default BiddingDetailsPage;
