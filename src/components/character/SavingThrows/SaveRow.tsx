import { useEffect, useState } from "react";

function SaveRow() {
  const [saveTotal, setSaveTotal] = useState<number>(0);
  const [saveBase, setSaveBase] = useState<number>("");
  const [abilityMod, setAbilityMod] = useState<number>(5);
  const [saveMagicMod, setSaveMagicMod] = useState<number>("");
  const [saveMiscMod, setSaveMiscMod] = useState<number>("");
  const [saveTempMod, setSaveTempMod] = useState<number>("");

  useEffect(() => {
    setSaveTotal(
      (saveBase ? saveBase : 0) + abilityMod +
        (saveMagicMod ? saveMagicMod : 0) + (saveMiscMod ? saveMiscMod : 0) +
        (saveTempMod ? saveTempMod : 0),
    );
  }, [saveBase, abilityMod, saveMagicMod, saveMiscMod, saveTempMod]);

  return (
    <div className="flex">
      <input
        type="number"
        name="Total"
        id="Total"
        value={saveTotal}
        disabled
        className="input-tiny"
      />
      <span>=</span>
      <input
        type="number"
        name="baseMod"
        id="baseMod"
        value={saveBase}
        onChange={(e) => setSaveBase(parseInt(e.target.value))}
        className="input-tiny"
      />
      <span>+</span>
      <input
        type="number"
        name="ability"
        id="ability"
        value={abilityMod}
        disabled
        className="input-tiny"
      />
      <span>+</span>
      <input
        type="number"
        name="magicMod"
        id="magicMod"
        value={saveMagicMod}
        onChange={(e) => setSaveMagicMod(parseInt(e.target.value))}
        className="input-tiny"
      />
      <span>+</span>
      <input
        type="number"
        name="miscMod"
        id="miscMod"
        value={saveMiscMod}
        onChange={(e) => setSaveMiscMod(parseInt(e.target.value))}
        className="input-tiny"
      />
      <span>+</span>
      <input
        type="number"
        name="tempMod"
        id="tempMod"
        value={saveTempMod}
        onChange={(e) => setSaveTempMod(parseInt(e.target.value))}
        className="input-tiny"
      />
    </div>
  );
}

export default SaveRow;
