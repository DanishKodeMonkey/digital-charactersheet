import { useCentralization } from "../../CentralisationLayer/CentralisationContext.tsx";
import {useEffect} from 'react'

function Initiative() {
  const { state, dispatch } = useCentralization();

  const miscModifier = state.bonus.initiative.miscModifier
  const dexterity = state.stats.modifiers.dexterity;
  const initiativeTotal = state.bonus.initiative.initiativeTotal

  const updateInitiative = (newMiscModifier: number) => {
    dispatch({
      field: "bonus",
      type: "UPDATE_INITIATIVE",
      payload: { miscModifier: newMiscModifier},
    });
  };
  useEffect(() =>{
    updateInitiative(miscModifier)
  }, [dexterity])

  return (
    <div className="flex flex-col align-middle m-5 text-center">
      <h1 className="input-title text-start">Initiative</h1>
      <div className="flex  justify-between  gap-2">
        <div className="flex flex-col-reverse self-start">
          <label htmlFor="initiativeTotal">Total</label>
          <input
            className="input-base w-full"
            type="number"
            name="initiativeTotal"
            id="initiativeTotal"
            value={initiativeTotal}
            disabled
          />
        </div>
        <span className="input-label pt-4">=</span>
        <div className="flex flex-col-reverse">
          <label className="input-label" htmlFor="dexMod">
            Dex <br /> Modifier
          </label>
          <input
            className="input-base  w-full"
            type="number"
            name="dexMod"
            id="dexMod"
            value={dexterity}
            disabled
          />
        </div>
        <span className="input-label pt-4">+</span>
        <div className="flex flex-col-reverse">
          <label className="input-label" htmlFor="miscMod">
            Misc <br /> modifier
          </label>
                   <input
            className="input-base w-full"
            type="number"
            name="miscModifier"
            id="miscModifier"
            defaultValue={miscModifier.toString()}
            onFocus={(e) => {
              e.target.value = "";
            }} // Clear value on focus
            onBlur={(e) => {
              if (e.target.value === "") {
                console.log(e.target.value);

                e.target.value = miscModifier.toString(); // Reset to original state if blank
              } else {
                updateInitiative(Number(e.target.value)); // Update state with the new value
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Initiative;
