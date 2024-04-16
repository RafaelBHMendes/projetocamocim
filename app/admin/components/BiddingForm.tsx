import supabase from "@/app/lib/supabase";
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
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
        <h1 className="text-lg text-center font-bold mb-4">Admin Dashboard</h1>
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
          />
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Data
          </label>
          <input
            name="date"
            type="text"
            placeholder="Data (dd/mm/aaaa)"
            value={newBid.date}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          {/*<label className="block text-sm font-medium text-gray-700">
            PDF do Processo
          </label>
          <input
            name="file"
            type="file"
            accept="application/pdf"
            onChange={handleInputChange}
            className="mt-1 block w-full border shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />*/}
          <div className="flex justify-between items-center">
            <select
              name="opening"
              value={newBid.opening}
              onChange={handleInputChange}
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
