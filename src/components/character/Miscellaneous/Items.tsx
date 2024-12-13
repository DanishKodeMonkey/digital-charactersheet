import { useState } from "react";
import ItemRow from "./ItemRow.tsx";
import { Item } from "../../../types/inventory.ts";

function Items(
  { itemType, items, addItem, removeItem }: {
    itemType: string;
    items: Item[];
    addItem: (item: Item) => void;
    removeItem: (index: number) => void;
  },
) {
  const [itemName, setItemName] = useState<string>("");
  const [itemNote, setItemNote] = useState<string>("");

  const handleAddItem = () => {
    if (!itemName.trim()) {
      alert("Please enter a Item name");
      return;
    }
    const newItem = {
      index: items.length + 1,
      name: itemName,
      note: itemNote || "",
    };

    addItem(newItem);
    setItemName("");
    setItemNote("");
  };

  return (
    <div className="bg-red-500 bg-opacity-50">
      <h1>{itemType}</h1>
      <ul>
        {items.map((item: Item) => (
          <ItemRow key={item.index} item={item} onRemove={removeItem} />
        ))}
      </ul>
      <div className="grid grid-cols-6 gap-2">
        <input
          type="text"
          name="ItemName"
          id="ItemName"
          placeholder="name"
          className="input-small col-span-4"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          name="ItemNote"
          id="ItemNote"
          placeholder="Notes"
          className="input-small"
          value={itemNote}
          onChange={(e) => setItemNote(e.target.value)}
        />

        <button
          type="submit"
          onClick={handleAddItem}
          className="btn btn-primary"
        >
          Add Item
        </button>
      </div>
    </div>
  );
}

export default Items;
