import { useState } from "react";
import { useCentralization } from "../../CentralisationLayer/CentralisationContext.tsx";

function BaseAttackBonus() {
  const { state, dispatch } = useCentralization();
  /*
     Your attack bonus with a melee weapon is:


     HUSKAT
     base attack is determined by class, update to pull from characterDetails.class. once updated
    Base attack bonus + Strength modifier + size modifier

    With a ranged weapon, your attack bonus is:

    Base attack bonus + Dexterity modifier + size modifier + range penalty

    */
  const baseAttackBonus = 1; // TEMP
  const strengthMod = state.stats.modifiers.strength;
  const sizeMod = state.characterDetails.size.ACMod;

  const baseAtk = baseAttackBonus + strengthMod + sizeMod;

  return (
    <div className="flex flex-col m-5 text-center">
      <label htmlFor="BaseAttackBonus" className="input-title">
        Base Attack Bonus
      </label>
      <div className="input-container">
        <div className="input-container-col">
          <input
            className="input-base w-full"
            type="number"
            name="baseAtkBonus"
            id="baseAtkBonus"
            value={baseAtk}
            readOnly
          />
          <label htmlFor="baseAtkBonus">Total</label>
        </div>
        <span className="mt-4">=</span>

        <div className="input-container-col">
          <input
            className="input-base w-full"
            type="number"
            name="bonusMod"
            id="bonusMod"
            value={baseAttackBonus}
            readOnly
          />
          <label htmlFor="bonusMod">Base attack</label>
        </div>
        <span className="mt-4">+</span>
        <div className="input-container-col">
          <input
            className="input-base w-full"
            type="number"
            name="strengthMod"
            id="strengthMod"
            value={strengthMod}
            readOnly
          />
          <label htmlFor="strengthMod">Strength mod</label>
        </div>
        <span className="mt-4">+</span>
        <div className="input-container-col">
          <input
            className="input-base w-full"
            type="number"
            name="sizeMod"
            id="sizeMod"
            value={sizeMod}
            readOnly
          />
          <label htmlFor="sizeMod">Size mod</label>
        </div>

      </div>
    </div>
  );
}

export default BaseAttackBonus;
