import { useState } from "react";
import { WeaponTypeProp } from "../../../types/inventory.ts";
// huskat: seperate types to typefile

function Weapon({ name }: WeaponTypeProp) {
  const [wepName, setWepName] = useState<string>(name ? name : "");
  const [atkBonus, setAtkBonus] = useState<string>("");
  const [wepDamage, setWepDamage] = useState<string>("");
  const [wepCrit, setWepCrit] = useState<string>("");
  const [wepRange, setWepRange] = useState<string>("");
  const [wepType, setWepType] = useState<string>("");
  const [wepNotes, setWepNotes] = useState<string>("");
  const [wepAmmo, setWepAmmo] = useState<number>("");
  const [wepAmmoMax, setWepAmmoMax] = useState<number>("");

  return (
    <div className="grid grid-cols-8 gap-4 bg-red-300 bg-opacity-80 ring-2 p-2 m-2">
      <div className="col-span-3 flex flex-col justify-between">
        <label className="input-label" htmlFor="weapon-name">ATTACK</label>

        <input
          className="small-input input-string-text "
          type="text"
          name="weapon-name"
          id={`weapon-id-${name}`}
          value={wepName}
          onChange={(e) => setWepName(e.target.value)}
        />
      </div>
      <div className="col-span-2 flex flex-col justify-between">
        <label className="input-label" htmlFor="attack-bonus">
          ATTACK BONUS
        </label>

        <input
          className="small-input input-string-text "
          type="text"
          name="attack-bonus"
          id={`weapon-atkBonus-${name}`}
          value={atkBonus}
          onChange={(e) => setAtkBonus(e.target.value)}
        />
      </div>
      <div className="col-span-2 flex flex-col justify-between">
        <label className="input-label" htmlFor="weapon-damage">DAMAGE</label>

        <input
          className="small-input input-string-text "
          type="text"
          name="weapon-damage"
          id={`weapon-damage-${name}`}
          value={wepDamage}
          onChange={(e) => setWepDamage(e.target.value)}
        />
      </div>
      <div className="flex flex-col justify-between">
        <label className="input-label" htmlFor="weapon-crit">CRIT</label>

        <input
          className="small-input input-string-text "
          type="text"
          name="weapon-crit"
          id={`weapon-crit-${name}`}
          value={wepCrit}
          onChange={(e) => setWepCrit(e.target.value)}
        />
      </div>

      <div className="flex flex-col justify-between">
        <label className="input-label" htmlFor="weapon-range">RANGE</label>

        <input
          type="text"
          className="small-input input-string-text "
          name="weapon-range"
          id={`weapon-range-${name}`}
          value={wepRange}
          onChange={(e) => setWepRange(e.target.value)}
        />
      </div>
      <div className="flex flex-col justify-between">
        <label className="input-label" htmlFor="weapon-type">TYPE</label>

        <input
          className="small-input input-string-text "
          type="text"
          name="weapon-type"
          id={`weapon-type-${name}`}
          value={wepType}
          onChange={(e) => setWepType(e.target.value)}
        />
      </div>
      <div className="col-span-6 flex flex-col justify-between">
        <label className="input-label" htmlFor="weapon-notes">NOTES</label>

        <input
          className="small-input input-string-text "
          type="text"
          name="weapon-notes"
          id={`weapon-notes-${name}`}
          value={wepNotes}
          onChange={(e) => setWepNotes(e.target.value)}
        />
      </div>
      <div className="col-span-3">
        <div className="flex flex-row gap-2">
          <div className="w-1/3 md:w-1/2">
            <label className="input-label" htmlFor="weapon-ammo">
              Ammunition
            </label>

            <input
              className="small-input input-string-text "
              type="text"
              name="weapon-ammo"
              id={`weapon-ammo-${name}`}
              value={wepAmmo}
              onChange={(e) => setWepAmmo(e.target.value)}
            />
          </div>
          <span className="self-end text-3xl md:text-4xl">/</span>
          <div className="w-1/3 md:w-1/2">
            <label className="input-label" htmlFor="weapon-ammo-max">Max</label>

            <input
              className="small-input input-string-text "
              type="number"
              name="weapon-ammo-max"
              id={`weapon-ammo-max-${name}`}
              value={wepAmmoMax}
              onChange={(e) => setWepAmmoMax(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weapon;
