import Image from "next/image";
import React from "react";
import Link from "next/link";

import eye from "../../../public/eye.svg";
import pdf from "../../../public/pdf.svg";

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

const formatDateTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const BiddingsTable: React.FC<{ biddings: Bidding[] }> = ({ biddings }) => {
  if (biddings.length === 0) {
    return <div className="text-center py-4">Não há resultados.</div>;
  }

  const getOpeningClass = (opening: string) => {
    switch (opening) {
      case "Fechada":
        return "bg-danger text-white";
      case "Aberta":
        return "bg-success text-white";
      case "Adiado":
        return "bg-warning text-white";
      case "Anulado":
        return "bg-gray-700 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-base">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-blue-200">Nº Processo</th>
            <th className="py-2 px-4 bg-blue-200">Objeto</th>
            <th className="py-2 px-4 bg-blue-200">Data de Publicação</th>
            <th className="py-2 px-4 bg-blue-200">Data de Abertura</th>
            <th className="py-2 px-4 bg-blue-200">Abertura</th>
            <th className="py-2 px-4 bg-blue-200">Ações</th>
          </tr>
        </thead>
        <tbody>
          {biddings.map((bid) => (
            <tr key={bid.id} className="text-center border-b text-sm">
              <td className="py-2 px-4">{bid.processNumber}</td>
              <td className="py-2 px-4">{bid.object}</td>
              <td className="py-2 px-4">{bid.publicationDate}</td>
              <td className="py-2 px-4">{formatDateTime(bid.dispenseDate)}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded-full ${getOpeningClass(
                    bid.opening
                  )}`}
                >
                  {bid.opening}
                </span>
              </td>
              <td className="py-2 px-4 ">
                <div className="align-middle self-center flex flex-row gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-800 "
                    onClick={() => window.open(bid.file, "_blank")}
                  >
                    <Image
                      src={pdf}
                      alt={"link do pdf"}
                      height={40}
                      width={40}
                    />
                  </button>

                  <Link
                    href={`/biddings/${bid.id}`}
                    className="text-blue-500 hover:text-blue-800"
                  >
                    <Image
                      src={eye}
                      alt="Ver detalhes da licitação"
                      height={40}
                      width={40}
                      className="rounded-xl"
                    />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BiddingsTable;
