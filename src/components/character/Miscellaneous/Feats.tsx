import { useState } from "react";
import ItemRow from "./ItemRow.tsx";

interface Feat {
  index: number;
  name: string;
  note: string;
}

function Feats() {
  const [feats, setFeats] = useState<Feat[]>([]);
  const [featName, setFeatName] = useState<string>("");
  const [featNote, setFeatNote] = useState<string>("");

  const addFeat = (feat) => {
    if (!featName.trim()) {
      alert("Please enter a feat name");
      return;
    }
    const newItem = {
      index: feats.length + 1,
      name: featName,
      note: featNote || "",
    };

    setFeats([...feats, newItem]);
    setFeatName("");
    setFeatNote("");
  };

  const removeFeat = (index: number) => {
    const updatedFeats = feats.filter((item:Feat) => item.index !== index);
    setFeats(updatedFeats);
  };

  return (
    <div>
      <h1>Feats</h1>
      <ul>
        {feats.map((feat:Feat) => (
          <ItemRow key={feat.index} item={feat} onRemove={removeFeat} />
        ))}
      </ul>
      <div>
        <input type="text" name="featName" id="featName" placeholder="name" value={featName} onChange={(e) => setFeatName(e.target.value)} />
        <input type="text" name="featNote" id="featNote" placeholder="Notes" value={featNote} onChange={(e) => setFeatNote(e.target.value)} />

        <button
          type="submit"
          onClick={addFeat}
        >
          Add feat
        </button>
      </div>
    </div>
  );
}


export default Feats