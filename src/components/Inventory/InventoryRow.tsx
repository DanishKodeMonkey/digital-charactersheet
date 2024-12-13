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
    <div className="grid grid-cols-8 gap-2">
      <input
        type="text"
        value={possession.item}
        onChange={(e) => handleInputChange("item", +e.target.value)}
        placeholder="Item name"
        className="col-span-5 input-small"
      />
      <input
        type="number"
        value={possession.amount}
        onChange={(e) => handleInputChange("amount", +e.target.value)}
        placeholder="Amount "
        className="input-small"
      />
      <input
        type="number"
        value={possession.weight}
        onChange={(e) => handleInputChange("weight", +e.target.value)}
        placeholder="Weight input-small"
        className="input-small"
      />
      <button onClick={onRemove} className="btn-sm btn-danger">Remove</button>
    </div>
  );
}

export default InventoryRow;
