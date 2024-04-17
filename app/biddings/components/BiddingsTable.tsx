// app/biddings/components/BiddingsTable.tsx

import React from "react";

interface Bidding {
  id: number;
  processNumber: string;
  object: string;
  publicationDate: string;
  dispenseDate: string;
  opening: string;
  file: undefined;
  Url: string;
}

const BiddingsTable: React.FC<{ biddings: Bidding[] }> = ({ biddings }) => {
  if (biddings.length === 0) {
    return <div className="text-center py-4">Não há resultados.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-blue-200">Nº Processo</th>
            <th className="py-2 px-4 bg-blue-200">Objeto</th>
            <th className="py-2 px-4 bg-blue-200">Data de Publicação</th>
            <th className="py-2 px-4 bg-blue-200">Data de Dispensa</th>
            <th className="py-2 px-4 bg-blue-200">Abertura</th>
            <th className="py-2 px-4 bg-blue-200">Ações</th>
          </tr>
        </thead>
        <tbody>
          {biddings.map((bid) => (
            <tr key={bid.id} className="text-center border-b">
              <td className="py-2 px-4">{bid.processNumber}</td>
              <td className="py-2 px-4">{bid.object}</td>
              <td className="py-2 px-4">{bid.publicationDate}</td>
              <td className="py-2 px-4">{bid.dispenseDate}</td>
              <td className="py-2 px-4">{bid.opening}</td>
              <td className="py-2 px-4">
                <button
                  className="text-blue-500 hover:text-blue-800 "
                  onClick={() => window.open(bid.file, "_blank")}
                >
                  Pdf
                </button>
                <button
                  className="text-blue-500 hover:text-blue-800"
                  onClick={() => window.open(bid.Url, "_blank")}
                >
                  Site
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BiddingsTable;
