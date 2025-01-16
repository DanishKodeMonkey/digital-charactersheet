import React from "react";
import { useCentralization } from "../../CentralisationLayer/CentralisationContext.tsx";
import { HealthStatus } from "../../CentralisationLayer/CentralisationLayer.ts";

function Health() {
  const { state, dispatch } = useCentralization();
  const { maxHealth, currentHealth, damage } = state.status.health;

  const handleChange = (stat: keyof HealthStatus, value: number) => {
    console.log("Received", stat, value);
    
    if (!isNaN(value)) {
      dispatch({
        field: "health",
        type: "UPDATE_HEALTH_FIELD",
        payload: { stat: stat, value },
      });
    }
  };

  const handleDamageOrHeal = () => {
    console.log('damage', damage);
    
    if (damage !== 0) {
      dispatch({
        field: "health",
        type: damage < 0 ? "HEALTH_DAMAGE" : "HEALTH_HEAL",
        payload: { value: damage },
      });
    }
  };

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
          Damage/Healing
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
              handleChange("currentHealth", Number(e.target.value))}
          />
        </div>
        <span>+</span>
        <div>
          <input
            className="input-small w-full col-span-1"
            type="number"
            name="currentHealth"
            id="currentHealth"
            value={damage}
            onChange={(e) => handleChange("damage", Number(e.target.value))}
          />
        </div>
        <div>
          <button
            type="submit"
            className="col-span-1 btn btn-primary"
            onClick={handleDamageOrHeal}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Health;
