import { useState } from "react";
import { ShieldTypeProp } from "../../../types/inventory.ts";
// huskat: seperate types to typefile

function Shield({ name }: ShieldTypeProp) {
  const [shieldName, setShieldName] = useState<string>(name ? name : "");

  const [shieldAC, setShieldAc] = useState<number>("");

  const [shieldPenalty, setShieldPenalty] = useState<number>("");
  const [shieldSpellFail, setShieldSpellFail] = useState<number>("");

  const [shieldWeight, setShieldWeight] = useState<number>("");
  const [shieldSpecials, setShieldSpecials] = useState<string>("");

  return (
    <div className="grid grid-cols-8 gap-4 ring-2 p-2 m-2 bg-pink-300 bg-opacity-80">
      <div className="col-span-3 flex flex-col justify-between">
        <label className="input-label" htmlFor="shieldName">shield name</label>
        <input
          type="text"
          name="shieldName"
          id={`shield-name-${name}`}
          defaultValue={shieldName}
          className="input-small input-string-text "
          onChange={(e) => setShieldName(e.target.value)}
        />
      </div>

      <div className=" col-span-2 flex flex-col justify-between">
        <label className="input-label" htmlFor="shieldAC">AC bonus</label>
        <input
          type="text"
          name="shieldAC"
          id={`shield-AC-${name}`}
          value={shieldAC}
          className="small-input input-string-text "
          onChange={(e) => setShieldAc(e.target.value)}
        />
      </div>

      <div className="col-span-1 flex flex-col justify-between">
        <label className="input-label" htmlFor="shieldWeight">Weight</label>
        <input
          type="text"
          name="shieldWeight"
          id={`shield-weight-${name}`}
          value={shieldWeight}
          className="small-input input-string-text "
          onChange={(e) => setShieldWeight(e.target.value)}
        />
      </div>
      <div className="col-span-2 flex flex-col justify-between">
        <label className="input-label" htmlFor="shieldPenalty">
          Check penalty
        </label>
        <input
          type="text"
          name="shieldPenalty"
          id={`shield-Penalty-${name}`}
          value={shieldPenalty}
          className="small-input input-string-text "
          onChange={(e) => setShieldPenalty(e.target.value)}
        />
      </div>
      <div className="col-span-2 flex flex-col justify-between">
        <label className="input-label" htmlFor="shieldSpellFail">
          Spell Failure
        </label>
        <input
          type="text"
          name="shieldSpellFail"
          id={`shield-Spell-${name}`}
          value={shieldSpellFail}
          className="small-input input-string-text "
          onChange={(e) => setShieldSpellFail(e.target.value)}
        />
      </div>

      <div className="col-span-6 flex flex-col justify-between">
        <label className="input-label" htmlFor="shieldSpecials">
          Special Properties
        </label>
        <input
          type="text"
          name="shieldSpecials"
          id={`shield-specials-${name}`}
          value={shieldSpecials}
          className="small-input input-string-text "
          onChange={(e) => setShieldSpecials(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Shield;
