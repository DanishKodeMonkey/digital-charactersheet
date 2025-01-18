import { useCentralization } from "../../CentralisationLayer/CentralisationContext.tsx";
import { ArmorClassType } from "../../CentralisationLayer/CentralisationLayer.ts";

function ArmorClass() {
  // initialize the context, fetch state and dispatch action
  const { state, dispatch } = useCentralization();

  // extract relevant armorClass specific variables
  const { aBonus, sizeModifier, naturalArmor, miscModifier } = state.status.armorClass;

  // extract stats dependant variable
  const dexterity = state.stats.modifiers.dexterity;

  // calculate actotal based on values
  const acTotal = 10 + aBonus + dexterity - sizeModifier + naturalArmor +
    miscModifier;

  const handleChange = (stat: keyof ArmorClassType, value: number) => {
    // if value is left blank, set to 0
    if (isNaN(value)) {
      value = 0;
    }
    dispatch({
      field: "status",
      type: "UPDATE_ARMOR_CLASS_FIELD",
      payload: { stat, value },
    });
  };

  return (
    <>
      <h1 className="sm:hidden input-title">AC</h1>
      <div className="flex flex-col md:m-2">
        {/* Input Row */}
        <div className="flex flex-row flex-grow justify-around">
          <h1 className="max-sm:hidden self-center md:input-title">AC</h1>
          <div className="w-14 text-center mt-auto">
            <label htmlFor="totalAC" className="input-label">TOTAL</label>
            <input
              type="number"
              name="totalAC"
              id="totalAC"
              readOnly
              value={acTotal}
              className=" input-small w-full"
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
              className="input-small w-full"
              readOnly
            />
          </div>
          <span className="mt-auto mb-3">+</span>
          <div className="w-14 text-center mt-auto">
            <label htmlFor="armorBonus" className="input-label">
              Armor <br />bonus
            </label>
            <input
              type="number"
              name="armorBonus"
              id="armorBonus"
              className=" input-small w-full"
              value={aBonus}
              onChange={(e) => handleChange("aBonus", parseInt(e.target.value))}
            />
          </div>
          <span className="mt-auto mb-3">+</span>
          <div className="w-14 text-center mt-auto">
            <label htmlFor="dexMod" className="input-label">
              Dex <br />modifier
            </label>
            <input
              type="number"
              name="dexMod"
              id="dexMod"
              readOnly
              value={dexterity}
              className=" input-small w-full"
            />
          </div>
          <span className="mt-auto mb-3">-</span>
          <div className="w-14 text-center mt-auto">
            <label htmlFor="sizeMod" className="input-label">
              Size <br />modifier
            </label>
            <input
              type="number"
              name="sizeMod"
              id="sizeMod"
              className=" input-small w-full"
              value={sizeModifier}
              onChange={(e) =>
                handleChange("sizeModifier", parseInt(e.target.value))}
            />
          </div>
          <span className="mt-auto mb-3">+</span>
          <div className="w-14 text-center mt-auto">
            <label htmlFor="natArmor" className="input-label">
              Natural <br />Armor
            </label>
            <input
              type="number"
              name="natArmor"
              id="natArmor"
              className=" input-small w-full"
              value={naturalArmor}
              onChange={(e) =>
                handleChange("naturalArmor", parseInt(e.target.value))}
            />
          </div>
          <span className="mt-auto mb-3">+</span>
          <div className="w-14 text-center mt-auto">
            <label htmlFor="miscMod" className="input-label">
              Misc <br />modifier
            </label>
            <input
              type="number"
              name="miscMod"
              id="miscMod"
              className=" input-small w-full"
              value={miscModifier}
              onChange={(e) =>
                handleChange("miscModifier", parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ArmorClass;
