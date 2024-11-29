import { useEffect, useState } from "react";

function ArmorClass() {
  const [acTotal, setAcTotal] = useState<number>(0);
  const [aBonus, setABonus] = useState<number>("");
  const [dexterity, setDexterity] = useState<number>(5);
  const [sizeModifier, setSizeModifier] = useState<number>("");
  const [naturalArmor, setNaturalArmor] = useState<number>("");
  const [miscModifier, setMiscModifier] = useState<number>("");

  useEffect(() => {
    setAcTotal(
      10 + (aBonus ? aBonus : 0) + dexterity -
        (sizeModifier ? sizeModifier : 0) + (naturalArmor ? naturalArmor : 0) +
        (miscModifier ? miscModifier : 0),
    );
  }, [aBonus, sizeModifier, naturalArmor, miscModifier]);

  return (
    <>
    <h1 className="sm:hidden input-title">AC</h1>
    <div className="flex flex-col md:m-5">
      {/* Input Row */}
      <div className="flex flex-row flex-grow justify-around">
        <h1 className="max-sm:hidden self-center md:input-title">AC</h1>
        <div className="w-14 text-center mt-auto">
          <label htmlFor="totalAC" className="input-label">TOTAL</label>
          <input
            type="number"
            name="totalAC"
            id="totalAC"
            disabled
            value={acTotal}
            className=" small-input w-full"
          />
        </div>
        <span className="mt-auto mb-3">=</span>

        <div className="w-14 text-center mt-auto">
          <label htmlFor="baseAC" className="input-label">BASE</label>
          <input
            type="number"
            name="baseAC"
            id="baseAC"
            value="10"
            className="small-input w-full"
            disabled
          />
        </div>
        <span className="mt-auto mb-3">+</span>
        <div className="w-14 text-center mt-auto">

            <label htmlFor="armorBonus" className="input-label">Armor <br />bonus</label>
            <input
              type="number"
              name="armorBonus"
              id="armorBonus"
              className=" small-input w-full"
              value={aBonus}
              onChange={(e) => setABonus(parseInt(e.target.value))}
            />

        </div>
        <span className="mt-auto mb-3">+</span>
        <div className="w-14 text-center mt-auto">
          <label htmlFor="dexMod" className="input-label">Dex <br />modifier</label>
          <input
            type="number"
            name="dexMod"
            id="dexMod"
            disabled
            value={dexterity}
            className=" small-input w-full"
          />
        </div>
        <span className="mt-auto mb-3">-</span>
        <div className="w-14 text-center mt-auto">
          <label htmlFor="sizeMod" className="input-label">Size <br />modifier</label>
          <input
            type="number"
            name="sizeMod"
            id="sizeMod"
            className=" small-input w-full"
            value={sizeModifier}
            onChange={(e) => setSizeModifier(parseInt(e.target.value))}
          />
        </div>
        <span className="mt-auto mb-3">+</span>
        <div className="w-14 text-center mt-auto">
          <label htmlFor="natArmor" className="input-label">Natural <br />Armor</label>
          <input
            type="number"
            name="natArmor"
            id="natArmor"
            className=" small-input w-full"
            value={naturalArmor}
            onChange={(e) => setNaturalArmor(parseInt(e.target.value))}
          />
        </div>
        <span className="mt-auto mb-3">+</span>
        <div className="w-14 text-center mt-auto">
          <label htmlFor="miscMod" className="input-label">Misc <br />modifier</label>
          <input
            type="number"
            name="miscMod"
            id="miscMod"
            className=" small-input w-full"
            value={miscModifier}
            onChange={(e) => setMiscModifier(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
    </>
  );
}

export default ArmorClass;
