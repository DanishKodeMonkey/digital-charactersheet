import { useState } from "react";

import Wallet from "../../components/Inventory/Wallet.tsx";
import Possessions from "../../components/Inventory/Possesions.tsx";

import { Possession } from "../../types/inventory.ts";

function Inventory() {
  const [possessionsList, setPossessionsList] = useState<Possession[]>([]);

  const addPossession = (newPossession: Possession) => {
    setPossessionsList((prev) => [...prev, newPossession]);
  };

  const updatePossession = (index: number, updatedPossession: Possession) => {
    const updatedList = possessionsList.map((possession: Possession, i) =>
      i === index ? updatedPossession : possession
    );
    setPossessionsList(updatedList);
  };

  const removePossession = (index: number) => {
    const updatedList = possessionsList.filter((_, i) => i !== index);
    setPossessionsList(updatedList);
  };
  return (
    <div className="flex flex-col">
      <h1>Inventory</h1>
      <Possessions
        possessionsList={possessionsList}
        addPossession={addPossession}
        updatePossession={updatePossession}
        removePossession={removePossession}
      />
      <Wallet />
    </div>
  );
}

export default Inventory;
