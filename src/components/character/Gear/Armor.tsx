import { useState } from "react";
import { ArmorTypeProp } from "../../../types/inventory.ts";
// huskat: seperate types to typefile



function Armor({ name }: ArmorTypeProp) {
  const [armorName, setArmorName] = useState<string>(name ? name : "");
  const [armorType, setArmorType] = useState<string>("");
  const [armorAC, setArmorAc] = useState<number>("");
  const [armorDexMax, setArmorDexMax] = useState<number>("");
  const [armorPenalty, setArmorPenalty] = useState<number>("");
  const [armorSpellFail, setArmorSpellFail] = useState<number>("");
  const [armorSpeedMod, setArmorSpeedMod] = useState<number>("");
  const [armorWeight, setArmorWeight] = useState<number>("");
  const [armorSpecials, setArmorSpecials] = useState<string>("");

  return (
    <div className="grid grid-cols-8 gap-4 ring-2 p-2 m-2 bg-pink-300 bg-opacity-80">
      <div className="col-span-4 flex flex-col justify-between">
        <label className="input-label" htmlFor="armorName">Armor name</label>
        <input
          type="text"
          name="armorName"
          id={`armor-name-${name}`}
          defaultValue={armorName}
          className="small-input input-string-text "
          onChange={(e) => setArmorName(e.target.value)}
        />
      </div>
      <div className="col-span-1 flex flex-col justify-between">
        <label className="input-label" htmlFor="armorType">Armor Type</label>
        <input
          type="text"
          name="armorType"
          id={`armor-type-${name}`}
          value={armorType}
          className="small-input input-string-text "
          onChange={(e) => setArmorType(e.target.value)}
        />
      </div>
      <div className=" col-span-2 flex flex-col justify-between">
        <label className="input-label" htmlFor="armorAC">AC bonus</label>
        <input
          type="text"
          name="armorAC"
          id={`armor-AC-${name}`}
          value={armorAC}
          className="small-input input-string-text "
          onChange={(e) => setArmorAc(e.target.value)}
        />
      </div>
      <div className="col-span-1 flex flex-col justify-between">
        <label className="input-label" htmlFor="armorDexMax">Max Dex</label>
        <input
          type="text"
          name="armorDexMax"
          id={`armor-Dex-${name}`}
          value={armorDexMax}
          className="small-input input-string-text "
          onChange={(e) => setArmorDexMax(e.target.value)}
        />
      </div>
      <div className="col-span-2 flex flex-col justify-between">
        <label className="input-label" htmlFor="armorPenalty">
          Check penalty
        </label>
        <input
          type="text"
          name="armorPenalty"
          id={`armor-Penalty-${name}`}
          value={armorPenalty}
          className="small-input input-string-text "
          onChange={(e) => setArmorPenalty(e.target.value)}
        />
      </div>
      <div className="col-span-2 flex flex-col justify-between">
        <label className="input-label" htmlFor="armorSpellFail">
          Spell Failure
        </label>
        <input
          type="text"
          name="armorSpellFail"
          id={`armor-Spell-${name}`}
          value={armorSpellFail}
          className="small-input input-string-text "
          onChange={(e) => setArmorSpellFail(e.target.value)}
        />
      </div>
      <div className="col-span-1 flex flex-col justify-between">
        <label className="input-label" htmlFor="armorSpeed">Speed</label>
        <input
          type="text"
          name="armorSpeed"
          id={`armor-speed-${name}`}
          value={armorSpeedMod}
          className="small-input input-string-text "
          onChange={(e) => setArmorSpeedMod(e.target.value)}
        />
      </div>
      <div className="col-span-1 flex flex-col justify-between">
        <label className="input-label" htmlFor="armorWeight">Weight</label>
        <input
          type="text"
          name="armorWeight"
          id={`armor-weight-${name}`}
          value={armorWeight}
          className="small-input input-string-text "
          onChange={(e) => setArmorWeight(e.target.value)}
        />
      </div>
      <div className="col-span-2 flex flex-col justify-between">
        <label className="input-label" htmlFor="armorSpecials">
          Special Properties
        </label>
        <input
          type="text"
          name="armorSpecials"
          id={`armor-specials-${name}`}
          value={armorSpecials}
          className="small-input input-string-text "
          onChange={(e) => setArmorSpecials(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Armor;
