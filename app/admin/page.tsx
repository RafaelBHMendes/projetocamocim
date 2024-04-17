"use client";

import React, { useEffect, useState } from "react";
import { Bid } from "../admin/components/types"; // Importe o tipo Bid
import BiddingForm from "../admin/components/BiddingForm";
import BiddingList from "../admin/components/BiddingList";
import supabase from "../lib/supabase"; // Ajuste conforme a localização do seu cliente Supabase
import { toast } from "react-toastify";

const AdminPage: React.FC = () => {
  const [biddings, setBiddings] = useState<Bid[]>([]);
  const [newBid, setNewBid] = useState<Bid>({
    processNumber: "",
    object: "",
    publicationDate: "",
    dispenseDate: "",
    opening: "Aberta",
    file: undefined,
    Url: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      let { data, error } = await supabase.from("bidding").select("*");
      if (error) console.error("Error fetching biddings", error);
      else setBiddings(data || []);
    };

    fetchData();
  }, []);

  const handleAddBid = async (bid: Bid): Promise<void> => {
    const { data, error } = await supabase.from("bidding").insert([
      {
        ...bid,
        publicationDate: new Date(
          bid.publicationDate.split("/").reverse().join("-")
        ).toISOString(),
        dispenseDate: new Date(
          bid.dispenseDate.split("/").reverse().join("-")
        ).toISOString(),
      },
    ]);
    if (error) {
      console.error("Failed to add bid", error);
      toast.error("Erro: " + error.message);
    } else if (data) {
      setBiddings((prevBids) => [...prevBids, ...data]);
      setNewBid({
        processNumber: "",
        object: "",
        publicationDate: "",
        dispenseDate: "",
        opening: "Aberta",
        Url: "",
      }); // Reset form
      toast.success("Licitação Adicionada!");
    }
  };

  const handleRemoveBid = async (id: number): Promise<void> => {
    const { data, error } = await supabase
      .from("bidding")
      .delete()
      .match({ id });

    if (error) {
      console.error("Failed to remove bid", error);
      toast.error("Erro: " + error.message);
    } else {
      setBiddings((prevBids) => prevBids.filter((bid) => bid.id !== id));
      toast.success("Licitação Removida!");
    }
  };

  return (
    <div>
      <BiddingForm onAdd={handleAddBid} newBid={newBid} setNewBid={setNewBid} />
      <BiddingList biddings={biddings} onRemove={handleRemoveBid} />
    </div>
  );
};

export default AdminPage;
