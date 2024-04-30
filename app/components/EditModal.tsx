// components/EditModal.tsx

import React from "react";
import { Bid } from "../admin/components/types";
import { uploadPdf } from "@/api/uploadPdf";
import { getPdfUrl } from "@/api/getPdfUrl";

interface EditModalProps {
  bid: Bid;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (bid: Bid) => void;
  setBid: React.Dispatch<React.SetStateAction<Bid | null>>;
}

const EditModal: React.FC<EditModalProps> = ({
  bid,
  isOpen,
  onClose,
  onEdit,
  setBid,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBid((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const filePath = await uploadPdf(file);
      console.log(filePath);
      if (filePath) {
        const url = await getPdfUrl(filePath);
        setBid({ ...bid, file: url });
        console.log(url);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Editar Licitação</h2>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Nº do Processo
          </label>
          <input
            name="processNumber"
            type="text"
            placeholder="Nº Processo"
            value={bid.processNumber}
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
            value={bid.object}
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
            type="text"
            placeholder="Data (dd/mm/aaaa)"
            value={bid.publicationDate}
            onChange={handleInputChange}
            className="border-2 border-slate-300 hover:border-slate-600 rounded-lg placeholder:p-2"
          />
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Data de Dispensa
          </label>
          <input
            name="dispenseDate"
            type="text"
            placeholder="Data (dd/mm/aaaa)"
            value={bid.dispenseDate}
            onChange={handleInputChange}
            className="border-2 border-slate-300 hover:border-slate-600 rounded-lg placeholder:p-2"
          />
          <label className="block text-sm font-medium text-gray-700">
            Modalidade
          </label>
          <div className="flex justify-between items-center">
            <select
              name="modality"
              value={bid.modality}
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
            value={bid.Url}
            onChange={handleInputChange}
            className="border-2 border-slate-300 hover:border-slate-600 rounded-lg placeholder:p-2"
          />
          <label className="block text-sm font-medium text-gray-700">
            Abertura
          </label>
          <div className="flex justify-between items-center">
            <select
              name="opening"
              value={bid.opening}
              onChange={handleInputChange}
              className="border-2 border-slate-300 hover:border-slate-600 rounded-lg placeholder:p-2"
            >
              <option value="Aberta">Aberta</option>
              <option value="Fechada">Fechada</option>
            </select>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => onEdit(bid)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
