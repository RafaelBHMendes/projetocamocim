// components/EditModal.tsx

import React from "react";
import { Bid } from "../admin/components/types";

interface EditModalProps {
  bid: Bid;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (bid: Bid) => void;
  setBid: React.Dispatch<React.SetStateAction<Bid>>;
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Editar Licitação</h2>
        <div className="space-y-4">
          <input
            name="processNumber"
            type="text"
            value={bid.processNumber}
            onChange={handleInputChange}
            className="border-2 w-full"
          />
          {/* Repita para outros campos como object, publicationDate, etc. */}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
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
  );
};

export default EditModal;
