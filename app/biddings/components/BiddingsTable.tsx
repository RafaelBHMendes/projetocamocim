// app/biddings/components/BiddingsTable.tsx

import React from "react";

interface Bidding {
  id: number;
  processNumber: string;
  object: string;
  date: string;
  opening: string;
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
            <th className="py-2 px-4 bg-blue-200">Data</th>
            <th className="py-2 px-4 bg-blue-200">Abertura</th>
            <th className="py-2 px-4 bg-blue-200">Ações</th>
          </tr>
        </thead>
        <tbody>
          {biddings.map((bid) => (
            <tr key={bid.id} className="text-center border-b">
              <td className="py-2 px-4">{bid.processNumber}</td>
              <td className="py-2 px-4">{bid.object}</td>
              <td className="py-2 px-4">{bid.date}</td>
              <td className="py-2 px-4">{bid.opening}</td>
              <td className="py-2 px-4">
                <button className="text-blue-500 hover:text-blue-800">
                  Ver
                </button>
                {/* Adicione mais botões de ação conforme necessário */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BiddingsTable;
