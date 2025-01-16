import React from "react";
import { useCentralization } from "../../CentralisationLayer/CentralisationContext.tsx";


function Speed() {
  const {state, dispatch} = useCentralization()


  const speed = state.status.speed.speed

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseInt((e.target.value, 10 ) || 0)

    dispatch({
      field: "status",
      type: "UPDATE_SPEED",
      payload: {value: newSpeed}
    })
  }


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
        onChange={(e) => setSpeed(parseInt(e.target.value))}
      />
    </div>
  );
}

export default Speed;
