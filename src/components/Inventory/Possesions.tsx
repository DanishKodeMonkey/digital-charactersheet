import { useState } from "react";
import InventoryRow from "./InventoryRow.tsx";
import { Possession } from "../../types/inventory.ts";

interface PossessionsProps {
  possessionsList: Possession[];
  addPossession: (newPossession: Possession) => void;
  updatePossession: (index: number, updatePossession: Possession) => void;
  removePossession: (index: number) => void;
}

function Possessions(
  { possessionsList, addPossession, removePossession, updatePossession }:
    PossessionsProps,
) {
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemAmount, setNewItemAmount] = useState<number>(0);
  const [newItemWeight, setNewItemWeight] = useState<number>(0);

  const handleAddPossession = () => {
    if (!newItemName.trim()) {
      alert("Item name is required!");
      return;
    }
    addPossession({
      item: newItemName || "item",
      amount: newItemAmount || 0,
      weight: newItemWeight || 0,
    });
    setNewItemName("");
    setNewItemAmount(0);
    setNewItemWeight(0);
  };

  return (
    <div>
      <h1>POSSESSIONS</h1>
      {possessionsList.map((possession, index) => (
        <InventoryRow
          key={index}
          index={index}
          possession={possession}
          onUpdate={(updatedPossession) =>
            updatePossession(index, updatedPossession)}
          onRemove={() => removePossession(index)}
        />
      ))}
      <div>
        <input
          type="text"
          name="itemName"
          id="itemName"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          type="number"
          name="itemAmount"
          id="itemAmount"
          value={newItemAmount}
          onChange={(e) => setNewItemAmount(Number(e.target.value))}
        />
        <input
          type="number"
          name="itemWeight"
          id="itemWeight"
          value={newItemWeight}
          onChange={(e) => setNewItemWeight(Number(e.target.value))}
        />
      </div>
      <button onClick={handleAddPossession}>Add item</button>
    </div>
  );
}

export default Possessions;
