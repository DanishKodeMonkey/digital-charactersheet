import { useState } from "react";
import ItemRow from "./ItemRow.tsx";

interface Item {
  index: number;
  name: string;
  note: string;
}

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
      <div>
        <input
          type="text"
          name="ItemName"
          id="ItemName"
          placeholder="name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          name="ItemNote"
          id="ItemNote"
          placeholder="Notes"
          value={itemNote}
          onChange={(e) => setItemNote(e.target.value)}
        />

        <button
          type="submit"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </div>
    </div>
  );
}

export default Items;
