import { useState } from "react";

// huskat: seperate types to typefile

interface WeaponTypeProp {
  name: string;
}

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
    <div className="grid grid-cols-5 grid-rows-3 bg-red-300 bg-opacity-80 ring-2">
      <div className="col-span-1 flex flex-col">
        <label htmlFor="weapon-name">ATTACK</label>
        <div>
          <input
            className="input-small"
            type="text"
            name="weapon-name"
            id={`weapon-id-${name}`}
            value={wepName}
          />
        </div>
      </div>
      <div className="col-span-1 flex flex-col">
        <label htmlFor="attack-bonus">ATTACK BONUS</label>
        <div>
          <input
            className="input-small"
            type="text"
            name="attack-bonus"
            id={`weapon-atkBonus-${name}`}
            value={atkBonus}
          />
        </div>
      </div>
      <div className="col-span-1 flex flex-col">
        <label htmlFor="weapon-damage">DAMAGE</label>
        <div>
          <input
            className="input-small"
            type="text"
            name="weapon-damage"
            id={`weapon-damage-${name}`}
            value={wepDamage}
          />
        </div>
      </div>
      <div className="col-span-1 flex flex-col">
        <label htmlFor="weapon-crit">CRIT</label>
        <div>
          <input
            className="input-small"
            type="text"
            name="weapon-crit"
            id={`weapon-crit-${name}`}
            value={wepCrit}
          />
        </div>
      </div>

      <div className="row-start-2 col-span-1 flex flex-col">
        <label htmlFor="weapon-range">RANGE</label>
        <div>
          <input
            type="text"
            name="weapon-range"
            id={`weapon-range-${name}`}
            value={wepRange}
          />
        </div>
      </div>
      <div className="row-start-2 col-span-1 flex flex-col">
        <label htmlFor="weapon-type">TYPE</label>
        <div>
          <input
            className="input-small"
            type="text"
            name="weapon-type"
            id={`weapon-type-${name}`}
            value={wepType}
          />
        </div>
      </div>
      <div className=" row-start-2 col-span-3 flex flex-col">
        <label htmlFor="weapon-notes">NOTES</label>
        <div>
          <input
            className="input-small w-full"
            type="text"
            name="weapon-notes"
            id={`weapon-notes-${name}`}
            value={wepNotes}
          />
        </div>
      </div>
      <div className="row-start-3 col-span-8">
        <div className="flex flex-row justify-center gap-3">
          <div>
            <label htmlFor="weapon-ammo">Ammunition</label>
            <div>
              <input
                className="tiny-input"
                type="text"
                name="weapon-ammo"
                id={`weapon-ammo-${name}`}
                value={wepAmmo}
              />
            </div>
          </div>
          <div>
            <label htmlFor="weapon-ammo-max">Max</label>
            <div>
              <input
                className="tiny-input"
                type="number"
                name="weapon-ammo-max"
                id={`weapon-ammo-max-${name}`}
                value={wepAmmoMax}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weapon;
