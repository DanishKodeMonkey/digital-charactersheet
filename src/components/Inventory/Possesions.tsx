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
    <div className="m-2 flex flex-col justify-between gap-8">
      <div>
        <h1>Possessions</h1>
        <div className="grid grid-cols-8 gap-2">
          <label className="col-span-5" htmlFor="">Item Name</label>
          <label htmlFor="">Quantity</label>
          <label htmlFor="">Weight</label>
        </div>
        {possessionsList.length < 1 ? ("No items found") : (
          possessionsList.map((possession, index) => (
            <InventoryRow
              key={index}
              index={index}
              possession={possession}
              onUpdate={(updatedPossession) =>
                updatePossession(index, updatedPossession)}
              onRemove={() => removePossession(index)}
            />
          ))
        )}
      </div>
      <div>
        <h2>New item</h2>

        <div className="grid grid-cols-8 gap-2">
          <label className="col-span-5" htmlFor="">Item Name</label>
          <label htmlFor="">Quantity</label>
          <label htmlFor="">Weight</label>
        </div>
        <div className="grid grid-cols-8 gap-2">
          <input
            type="text"
            name="itemName"
            id="itemName"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Item name"
            className="col-span-5 input-small"
          />

          <input
            type="number"
            name="itemAmount"
            id="itemAmount"
            value={newItemAmount}
            onChange={(e) => setNewItemAmount(Number(e.target.value))}
            className="input-small"
          />

          <input
            type="number"
            name="itemWeight"
            id="itemWeight"
            value={newItemWeight}
            onChange={(e) => setNewItemWeight(Number(e.target.value))}
            className="input-small"
          />
        </div>
        <button onClick={handleAddPossession} className="btn btn-primary mt-2">
          Add item
        </button>
      </div>
    </div>
  );
}

export default Possessions;
