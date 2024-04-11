"use client";

import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase";

interface Bid {
  id: number;
  processNumber: string;
  object: string;
  date: string;
  opening: "Aberta" | "Fechada";
}

const AdminPage: React.FC = () => {
  const [biddings, setBiddings] = useState<Bid[]>([]);
  const [newBid, setNewBid] = useState<Omit<Bid, "id">>({
    processNumber: "",
    object: "",
    date: "", // This field will be formatted before sending
    opening: "Aberta",
  });
  const [dateError, setDateError] = useState("");

  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;

  useEffect(() => {
    const fetchData = async () => {
      let { data, error } = await supabase.from("Bidding").select("*");
      if (error) console.error("Error fetching biddings", error);
      else setBiddings(data || []); // Aqui está a correção
    };

    fetchData();
  }, []);

  const handleAddBid = async (): Promise<void> => {
    if (!dateRegex.test(newBid.date)) {
      setDateError("Invalid date format. Use dd/mm/yyyy.");
      return;
    }

    const { data, error } = await supabase.from("Bidding").insert([
      {
        ...newBid,
        date: new Date(
          newBid.date.split("/").reverse().join("-")
        ).toISOString(),
      },
    ]);

    if (error) {
      console.error("Failed to add bid", error);
      // Handle error state here
    } else if (data) {
      // Certifique-se de que data não seja null antes de usar
      setBiddings([...biddings, ...data]);
      setNewBid({ processNumber: "", object: "", date: "", opening: "Aberta" }); // Reset form
    }
  };

  const handleRemoveBid = async (id: number): Promise<void> => {
    const { error } = await supabase.from("Biddings").delete().match({ id });

    if (error) {
      console.error("Failed to remove bid", error);
      // Handle error state here
    } else {
      setBiddings(biddings.filter((bid) => bid.id !== id));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-lg font-bold mb-4">Admin Dashboard</h1>
      {/* Form to add a new bid */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Nº do Processo
        </label>
        <input
          type="text"
          placeholder="Nº Processo"
          value={newBid.processNumber}
          onChange={(e) =>
            setNewBid({ ...newBid, processNumber: e.target.value })
          }
        />
        <label className="block text-sm font-medium text-gray-700">
          Objeto
        </label>
        <input
          type="text"
          placeholder="Objeto"
          value={newBid.object}
          onChange={(e) => setNewBid({ ...newBid, object: e.target.value })}
        />
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Data
        </label>
        <input
          type="text"
          placeholder="Data (dd/mm/aaaa)"
          value={newBid.date}
          onChange={(e) => setNewBid({ ...newBid, date: e.target.value })}
          className={`mt-1 block w-full border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 ${
            dateError ? "border-red-500" : ""
          }`}
        />
        {dateError && <p className="mt-2 text-sm text-red-600">{dateError}</p>}
        <div className="flex justify-between items-center">
          <select
            value={newBid.opening}
            onChange={(e) =>
              setNewBid({
                ...newBid,
                opening: e.target.value as "Aberta" | "Fechada",
              })
            }
          >
            <option value="Aberta">Aberta</option>
            <option value="Fechada">Fechada</option>
          </select>
          <button
            type="button"
            onClick={handleAddBid}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Adicionar
          </button>
        </div>
      </div>
      {/* List biddings with remove option */}
      <ul className="divide-y divide-gray-200 mt-6">
        {biddings.map((bid, index) => (
          <li
            key={bid.id}
            className="py-4 flex items-center justify-between space-x-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {bid.processNumber}
              </p>
              <p className="text-sm text-gray-500 truncate">{bid.object}</p>
              <p className="text-sm text-gray-500 truncate">{bid.date}</p>
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
              onClick={() => handleRemoveBid(index)}
              className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
