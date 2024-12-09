interface Item {
  index: number;
  name: string;
  note: string;
}
function ItemRow({ item, onRemove }: { item: Item; onRemove: (index:number) => void; }) {
  return (
    <li className="flex justify-between">
      <span>{item.name}</span>
      <span>{item.note}</span>
      <button onClick={() => onRemove(item.index)}>X</button>
    </li>
  );
}

export default ItemRow;
