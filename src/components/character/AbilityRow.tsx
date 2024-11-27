import {useState} from 'react';

type AbilityRowProps = {
  ability: string;
};

function AbilityRow({ ability }: AbilityRowProps) {
  const abilityId = ability.toLowerCase();

  const [score, setScore] = useState<number>(0);
  const [mod, setMod] = useState<number>(0);
  const [tempScore, setTempScore] = useState<number>(0)
  const [tempMod, setTempMod] = useState<number>(0)

  const increment = (setter: React.Dispatch<React.SetStateAction<number>>) =>{
    setter((prev) => prev+1)
  }
  const decrement = (setter: React.Dispatch<React.SetStateAction<number>>) =>{
    setter((prev) => prev-1)
  }
  return (
    <div className="ability-row">
      <label htmlFor={`${abilityId}Score`} className="font-bold input-title">
        {ability}
      </label>
      <div className="input-container">
          <input
            type="number"
            name={`${abilityId}Score`}
            id={`${abilityId}Score`}
            value={score}
            className="input-base"
            onChange={(e) => setScore(Number(e.target.value))}
          />
          <div className="input-incrementers">
            <button type="button" className="input-button" onClick={()=> increment(setScore)}>+</button>
            <button type="button" className="input-button" onClick={()=> decrement(setScore)}>-</button>
          </div>
      </div>

      <div className="input-container">
          <input
            type="number"
            name={`${abilityId}Mod`}
            id={`${abilityId}Mod`}
            value={mod}
            className="input-base"
            onChange={(e) => setMod(Number(e.target.value))}
            />
            <div className="input-incrementers">
              <button type="button" className="input-button" onClick={()=> increment(setMod)}>+</button>
              <button type="button" className="input-button" onClick={()=> decrement(setMod)}>-</button>
            </div>
      </div>
      <div className="input-container">
          <input
            type="number"
            name={`${abilityId}TempScore`}
            id={`${abilityId}TempScore`}
            className="input-base"
            value={tempScore}
            onChange={(e) => setTempScore(Number(e.target.value))}
            />
            <div className="input-incrementers">
              <button type="button" className="input-button" onClick={()=> increment(setTempScore)}>+</button>
              <button type="button" className="input-button" onClick={()=> decrement(setTempScore)}>-</button>
            </div>
      </div>
      <div className="input-container">
          <input
            type="number"
            name={`${abilityId}TempMod`}
            id={`${abilityId}TempMod`}
            className="input-base"
            value={tempMod}
            onChange={(e) => setTempMod(Number(e.target.value))}
            />
            <div className="input-incrementers">
              <button type="button" className="input-button" onClick={()=> increment(setTempMod)}>+</button>
              <button type="button" className="input-button" onClick={()=> decrement(setTempMod)}>-</button>
            </div>
      </div>
    </div>
  );
}
export default AbilityRow;
