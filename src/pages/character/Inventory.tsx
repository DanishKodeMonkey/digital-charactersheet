import {useState} from 'react'

import Wallet from "../../components/Inventory/Wallet.tsx";
import Possessions from "../../components/Inventory/Possesions.tsx";

interface Possession{
  item: string;
  amount: number;
  weight: number;
}

function Inventory() {
  const [possesions, setPossessions] = useState<Possession>([])

  return (
    <div className="flex flex-col">
      <h1>Inventory</h1>
      <Possessions />
      <Wallet />

    </div>
  );
}

export default Inventory;
