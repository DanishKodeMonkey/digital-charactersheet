import { Possession } from "../../types/inventory.ts";

function InventoryRow({
  index,
  possession,
  onUpdate,
  onRemove,
}: {
  index: number;
  possession: Possession;
  onUpdate: (updatedPossession: Possession) => void;
  onRemove: () => void;
}) {
  const handleInputChange = (
    field: keyof Possession,
    value: string | number,
  ) => {
    onUpdate({ ...possession, [field]: value });
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={possession.item}
        onChange={(e) => handleInputChange("item", +e.target.value)}
        placeholder="Item name"
      />
      <input
        type="number"
        value={possession.amount}
        onChange={(e) => handleInputChange("amount", +e.target.value)}
        placeholder="Amount"
      />
      <input
        type="number"
        value={possession.weight}
        onChange={(e) => handleInputChange("weight", +e.target.value)}
        placeholder="Weight"
      />
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

export default InventoryRow;
