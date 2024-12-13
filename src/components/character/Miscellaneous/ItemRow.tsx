import { Item } from "../../../types/inventory.ts";

function ItemRow(
  { item, onRemove }: { item: Item; onRemove: (index: number) => void },
) {
  return (
    <li className="grid grid-cols-6 gap-2">
      <input className="input-small col-span-4" type="text" name={`itemName-${item.name}`} id={`itemName-${item.name}`} value={item.name} disabled/>
      <input className="input-small" type="text" name={`itemNote-${item.note}`} id={`itemNote-${item.note}`} value={item.note} disabled/>

      <button className="btn btn-danger" onClick={() => onRemove(item.index)}>X</button>
    </li>
  );
}

export default ItemRow;
