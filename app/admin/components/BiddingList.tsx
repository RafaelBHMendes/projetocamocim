import { Bid } from "./types";

interface BiddingListProps {
  biddings: Bid[];
  onRemove: (id: number) => void;
  onEdit: (bid: Bid) => void;
}

const BiddingList: React.FC<BiddingListProps> = ({
  biddings,
  onRemove,
  onEdit,
}) => {
  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white shadow-md">
        <ul className="divide-y divide-gray-200 mt-6">
          {biddings.map((bid) => (
            <li
              key={bid.id}
              className="py-4 flex items-center justify-between space-x-3"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {bid.processNumber}
                </p>
                <p className="text-sm text-gray-500 truncate">{bid.object}</p>
                <p className="text-sm text-gray-500 truncate">
                  {bid.publicationDate}
                </p>
              </div>
              <span
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  bid.opening === "Aberta"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {bid.opening}
              </span>
              <button
                onClick={() => onEdit(bid)}
                className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Editar
              </button>
              <button
                onClick={() => {
                  if (bid.id !== undefined) {
                    onRemove(bid.id);
                  } else {
                    console.error(
                      "Tentativa de remover um lance sem ID válido"
                    );
                  }
                }}
                className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BiddingList;
