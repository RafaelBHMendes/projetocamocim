"use client";

import { useState } from "react";
import { getPdfUrl } from "../../../api/getPdfUrl";
import { uploadPdf } from "../../../api/uploadPdf";

import { Bid } from "./types";

interface BiddingFormProps {
  onAdd: (bid: Bid) => void;
  newBid: Bid;
  setNewBid: React.Dispatch<React.SetStateAction<Bid>>;
}

const BiddingForm: React.FC<BiddingFormProps> = ({
  onAdd,
  newBid,
  setNewBid,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewBid({ ...newBid, [name]: value });
    console.log(newBid);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const filePath = await uploadPdf(file);
      console.log(filePath);
      if (filePath) {
        const url = await getPdfUrl(filePath);
        setNewBid({ ...newBid, file: url });
        console.log(url);
      }
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
        <h1 className="text-lg text-center font-bold mb-4">
          Painel Administradivo
        </h1>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Nº do Processo
          </label>
          <input
            name="processNumber"
            type="text"
            placeholder="Nº Processo"
            value={newBid.processNumber}
            onChange={handleInputChange}
            className="border-2 border-slate-300 hover:border-slate-600 rounded-lg placeholder:p-2"
          />
          <label className="block text-sm font-medium text-gray-700">
            Objeto
          </label>
          <input
            name="object"
            type="text"
            placeholder="Objeto"
            value={newBid.object}
            onChange={handleInputChange}
            className="border-2 border-slate-300 hover:border-slate-600 rounded-lg placeholder:p-2"
          />
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Data de Publicação
          </label>
          <input
            name="publicationDate"
            type="date"
            placeholder="Data (dd/mm/aaaa)"
            value={newBid.publicationDate}
            onChange={handleInputChange}
            className="border-2 border-slate-300 hover:border-slate-600 rounded-lg placeholder:p-2"
          />
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Abertura do Certame
          </label>
          <input
            name="dispenseDate"
            type="datetime-local"
            value={newBid.dispenseDate}
            onChange={handleInputChange}
            className="border-2 border-slate-300 hover:border-slate-600 rounded-lg placeholder:p-2"
          />
          <label className="block text-sm font-medium text-gray-700">
            Modalidade
          </label>
          <div className="flex justify-between items-center">
            <select
              name="modality"
              value={newBid.modality}
              onChange={handleInputChange}
              className="border-2 border-slate-300 hover:border-slate-600 rounded-lg placeholder:p-2"
            >
              <option value="Pregão">Pregão</option>
              <option value="Concurso">Concurso</option>
              <option value="Credenciamento">Credenciamento</option>
              <option value="Dispensa">Dispensa</option>
            </select>
          </div>
          <label className="block text-sm font-medium text-gray-700">
            PDF do Processo
          </label>
          <input
            name="file"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-1 block w-full border shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <label className="block text-sm font-medium text-gray-700">
            Url do processo
          </label>
          <input
            name="Url"
            type="text"
            placeholder="https://exemplo.com"
            value={newBid.Url}
            onChange={handleInputChange}
            className="border-2 border-slate-300 hover:border-slate-600 rounded-lg placeholder:p-2"
          />
          <label className="block text-sm font-medium text-gray-700">
            Abertura
          </label>
          <div className="flex justify-between items-center">
            <select
              name="opening"
              value={newBid.opening}
              onChange={handleInputChange}
              className="border-2 border-slate-300 hover:border-slate-600 rounded-lg placeholder:p-2"
            >
              <option value="Aberta">Aberta</option>
              <option value="Fechada">Fechada</option>
            </select>
            <button
              onClick={() => onAdd(newBid)}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BiddingForm;
