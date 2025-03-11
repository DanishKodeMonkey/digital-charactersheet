import React, { useEffect } from "react";
import { useCentralization } from "../../../context/CentralisationLayer/CentralisationContext.tsx";

function Speed() {
  const { state, dispatch } = useCentralization();

  const { speed } = state.status.speed;
  const { raceBonus, raceBase } = state.characterDetails.race;
  const { aBonus } = state.status.armorClass;

  useEffect(() => {
    const raceBaseValue = raceBase ?? 30; //default until otherwise
    const raceBonusValue = raceBonus ?? 0; // default until otherwise

    const speed = (raceBaseValue + raceBonusValue) - aBonus;
    dispatch({
      field: "status",
      type: "UPDATE_SPEED",
      payload: { value: speed },
    });
  }, [raceBase, raceBonus, aBonus]);

  /* HUSKAT
    Speed = raceBase - armorPenalty(>medium=-10 + racebonus(gnome,halfling = +5 dwarf + 10))
    e.g
    Human heavy armor
    20 = 30 - 10 + 0
    Dwarf heavy armor
    20 = 20 - 10 + 10
    Halfling heavy armor
    15 = 20 - 10 + 5
    */

  return (
    <div className="m-5 text-center">
      <label htmlFor="speedInput" className="input-title text-2xl">Speed</label>
      <input
        className="input-base w-full"
        type="number"
        name="speedInput"
        id="speedInput"
        value={speed}
        readOnly
      />
    </div>
  );
}

export default Speed;
