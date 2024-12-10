import {useState} from 'react'

import Wallet from "../../components/Inventory/Wallet.tsx";
import Possessions from "../../components/Inventory/Possesions.tsx";

interface Possession{
  item: string;
  amount: number;
  weight: number;
}

function Inventory() {
  const [possessionsList, setPossessionsList] = useState<Possession[]>([])


  const addPossession = (newPossession: Possession) =>{
    setPossessions((prev) =>[...prev, newPossession])
  }

  const updatePossession = (index: number, updatedPossession: Possession) => {
    const updatedList = possessions.map((possession:Possession, i ) =>
    i === index ? updatedPossession : possession) 
    setPossessions(updatedList)
  }

  const removePossession = (index:number) =>{
    const updatedList = possessions.filter((_,i) => i !== index);
    setPossessions(updatedList)
  }
  return (
    <div className="flex flex-col">
      <h1>Inventory</h1>
      <Possessions 
      possessionsList={possessionsList} 
      addPossession={addPossession}
      updatePossession={updatePossession} 
      removePossession={removePossession}/>
      <Wallet />

    </div>
  );
}

export default Inventory;
