import { useEffect} from "react";
import { useCentralization } from "../../CentralisationLayer/CentralisationContext.tsx";

interface SaveRowProps {
  saveType: "fortitude" | "reflex" | "will";
}


function SaveRow({saveType}: SaveRowProps) {
  const {state, dispatch} = useCentralization()

  // fetch relevant data from state
  const saveThrow = state.savingThrows[saveType]
  
  const abilityMod = (() => {
    switch (saveType) {
      case "fortitude":
        return state.stats.modifiers.constitution;
      case "reflex":
        return state.stats.modifiers.dexterity;
      case "will":
        return state.stats.modifiers.wisdom;
      default:
        return 0;
    }
  })();


  const handleChange = (field: keyof typeof saveThrow, value: number) =>{
    console.log("Dispatching to", field, value);
    
    dispatch({
      field: "savingThrows",
      type: "UPDATE_SAVE_THROW_TOTAL",
      payload: {saveType, field, value}
    })
  }


useEffect(()=>{
 
  dispatch({
    field: 'savingThrows', type:"UPDATE_SAVE_THROW_ABILITY_MODIFIER",
    payload: {saveType}
  })
},[abilityMod, dispatch])

  return (
    <div className="flex">
      <input
        type="number"
        name="Total"
        id="Total"
        value={saveThrow.total || 0}
        disabled
        className="input-tiny"
      />
      <span>=</span>
      <input
        type="number"
        name="baseMod"
        id="baseMod"
        value={saveThrow.base || 0}
        className="input-tiny"
        disabled
      />
      <span>+</span>
      <input
        type="number"
        name="ability"
        id="ability"
        value={abilityMod || 0}
        disabled
        className="input-tiny"
      />
      <span>+</span>
      <input
        type="number"
        name="magicMod"
        id="magicMod"
        value={saveThrow.magicMod || 0}
        disabled
        className="input-tiny"
      />
      <span>+</span>
      <input
        type="number"
        name="miscMod"
        id="miscMod"
        className="input-tiny"

        defaultValue={saveThrow.miscMod.toString() || 0}
        onFocus={(e) => {
          e.target.value = "";
        }} // Clear value on focus
        onBlur={(e) => {
          if (e.target.value === "") {
            e.target.value = saveThrow.miscMod.toString(); // Reset to original state if blank
          } else {
            handleChange("miscMod", Number(e.target.value)); // Update state with the new value
          }
        }}
      />
      <span>+</span>
      <input
        type="number"
        name="tempMod"
        id="tempMod"
        className="input-tiny"

        defaultValue={saveThrow.tempMod.toString() || 0}
        onFocus={(e) => {
          e.target.value = "";
        }} // Clear value on focus
        onBlur={(e) => {
          if (e.target.value === "") {
            e.target.value = saveThrow.tempMod.toString(); // Reset to original state if blank
          } else {
            handleChange("tempMod", Number(e.target.value)); // Update state with the new value
          }
        }}
      />
    </div>
  );
}

export default SaveRow;
