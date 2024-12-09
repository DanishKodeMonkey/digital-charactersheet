import {useState} from 'react'

import Items from "../../components/character/Miscellaneous/Items.tsx";

function Character() {
  const[feats, setFeats] = useState([])
  const [specialAbilities, setSpecialAbilities ] = useState([])

  const addFeat = (feat) => setFeats((prev) => [...prev, feat])
  const removeFeat = (index) => setFeats((prev) => prev.filter((item) => item.index !== index))
  
  const addSpecialAbility = (SpecialAbility) => setSpecialAbilities((prev) => [...prev, SpecialAbility])
  const removeSpecialAbility = (index) => setSpecialAbilities((prev) => prev.filter((item) => item.index !== index))
  
  return (
    <div>
      <h1>Character</h1>
      <div>
      <Items itemType="Feats"
      items={feats}
      addItem={addFeat}
      removeItem={removeFeat} />
      </div>
      <div>
      <Items itemType="Special Abilities"
      items={specialAbilities}
      addItem={addSpecialAbility}
      removeItem={removeSpecialAbility} />
      </div>
    </div>
  );
}

export default Character;
