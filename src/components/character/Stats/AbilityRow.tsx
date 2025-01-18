import { AbilityRowProps } from "../../../types/character.ts";
import { useCentralization } from "../../CentralisationLayer/CentralisationContext.tsx";

function AbilityRow({ ability }: AbilityRowProps) {
  const { state, dispatch } = useCentralization();
  const abilityKey = ability.toLowerCase();

  const score = state.stats[abilityKey] || 0;
  const mod = state.stats.modifiers[abilityKey] || 0;
  const tempScore = state.stats.tempScores[abilityKey] || 0;
  const tempMod = state.stats.tempModifiers[abilityKey] || 0;

  const updateStat = (value: number) => {
    dispatch({
      field: "stats",
      type: "UPDATE_STAT",
      payload: { stat: abilityKey, value },
      skipDebounce: true
    });
  };

  const updateTempStat = (value: number) => {
    dispatch({
      field: "stats",
      type: "UPDATE_TEMP_STAT",
      payload: { stat: abilityKey, value },
      skipDebounce: true
    });
  };

  return (
    <div className="ability-row">
      <label htmlFor={`${abilityKey}Score`} className="font-bold input-title">
        {ability.slice(0, 3).toUpperCase()}
      </label>
      <div className="input-container">
        <input
          type="number"
          name={`${abilityKey}Score`}
          id={`${abilityKey}Score`}
          value={score}
          className="input-base w-3/4"
          onChange={(e) => updateStat(Number(e.target.value))}
        />
        <div className="input-incrementers">
          <button
            type="button"
            className="input-button button-incrementer"
            onClick={() => updateStat(score + 1)}
          >
            +
          </button>
          <button
            type="button"
            className="input-button button-incrementer"
            onClick={() => updateStat(score - 1)}
          >
            -
          </button>
        </div>
      </div>

      <div className="input-container no-incrementers">
        <input
          type="number"
          name={`${abilityKey}Mod`}
          id={`${abilityKey}Mod`}
          value={mod}
          className="input-base w-full"
          readOnly
        />
      </div>
      <div className="input-container">
        <input
          type="number"
          name={`${abilityKey}TempScore`}
          id={`${abilityKey}TempScore`}
          className="input-base w-3/4"
          value={tempScore}
          onChange={(e) => updateTempStat(Number(e.target.value))}
        />
        <div className="input-incrementers">
          <button
            type="button"
            className="input-button button-incrementer"
            onClick={() => updateTempStat(tempScore + 1)}
          >
            +
          </button>
          <button
            type="button"
            className="input-button button-incrementer"
            onClick={() => updateTempStat(tempScore - 1)}
          >
            -
          </button>
        </div>
      </div>
      <div className="input-container no-incrementers">
        <input
          type="number"
          name={`${abilityKey}TempMod`}
          id={`${abilityKey}TempMod`}
          className="input-base w-full"
          value={tempMod}
          readOnly
        />
      </div>
    </div>
  );
}
export default AbilityRow;
