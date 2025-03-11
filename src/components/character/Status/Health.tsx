import React from "react";
import { useCentralization } from "../../../context/CentralisationLayer/CentralisationContext.tsx";
import { HealthStatus } from "../../../context/CentralisationLayer/CentralisationLayer.ts";

/*
DND 3.5e health hit die formula
Max Health (1st Level) = Class Hit Die + Constitution Modifier

For subsequent levels, the formula is:

Max Health (subsequent levels) = Class Hit Die + Constitution Modifier (per level) x (level - 1)

*/
function Health() {
  const { state, dispatch } = useCentralization();
  const { maxHealth, currentHealth, damage, hitDie } = state.status.health;

  const handleChange = (stat: keyof HealthStatus, value: number) => {
    if (isNaN(value)) {
      value = 0;
    }

    dispatch({
      field: "status",
      type: "UPDATE_HEALTH_FIELD",
      payload: { stat, value },
    });
  };

  const handleLevel = () => {
    dispatch({
      field: "status",
      type: "UPDATE_HIT_DIE",
    });
  };

  // TODO re implement with damage input field?
  /*   const handleDamageOrHeal = () => {
    console.log('damage', damage);

    if (damage !== 0) {
      dispatch({
        field: "health",
        type: damage < 0 ? "HEALTH_DAMAGE" : "HEALTH_HEAL",
        payload: { value: damage },
      });
    }
  }; */

  return (
    <div className="grid grid-rows-2 my-2 items-center">
      <div className="grid grid-cols-4 text-center gap-10">
        <label htmlFor="HP" className="input-label  col-span-1">
          Max <br /> Health
        </label>
        <label htmlFor="currentHealth" className="input-label col-span-1">
          current <br /> Health
        </label>
        <label htmlFor="hitDie" className="input-label col-span-1">
          Hit Die (level)
        </label>
      </div>
      <div className="grid grid-cols-[4fr,.2fr,4fr,.2fr,4fr,2fr] gap-3 text-center">
        <div>
          <input
            type="number"
            className="input-small w-full col-span-1"
            name="maxHP"
            id="maxHP"
            readOnly
            value={maxHealth}
          />
        </div>
        <span>=</span>

        <div>
          <input
            type="number"
            className="input-small w-full col-span-1"
            name="currentHealth"
            id="currentHealth"
            value={currentHealth}
            onChange={(e) =>
              handleChange("currentHealth", parseInt(e.target.value))}
          />
        </div>
        <span>+</span>
        <div>
          <input
            className="input-small w-full col-span-1"
            type="number"
            name="hitDie"
            id="hitDie"
            value={hitDie}
            onChange={(e) =>
              handleChange("hitDie", parseInt(e.target.value) || 0)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="col-span-1 btn btn-primary"
            onClick={handleLevel}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Health;
