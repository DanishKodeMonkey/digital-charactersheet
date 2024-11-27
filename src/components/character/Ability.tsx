/// <reference path="./images.d.ts" />

import AbilityRow from "./AbilityRow.tsx";

function Ability() {
  const abilities = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-center">Character Stats</h1>

      <div className="grid grid-cols-5 gap-4 font-bold text-sm text-gray-700 border-b pb-2">
        <span className="col-start-1">Ability</span>
        <span className="col-start-2">Ability Score</span>
        <span className="col-start-3">Ability Modifier</span>
        <span className="col-start-4">Temp Score</span>
        <span className="col-start-5">Temp Modifier</span>

        {abilities.map((ability, index) => (
          <div key={index} className={`contents`}>
            <AbilityRow ability={ability} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ability;
