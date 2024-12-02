import AbilityRow from "./AbilityRow.tsx";

function Ability() {
  const abilities = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
  return (
    <div className="container">
      <h1 className="text-xl font-bold text-center">Character Stats</h1>

      <div className="grid grid-cols-5 font-bold ability-row-headers ">
        <span className="col-start-1"></span>
        <span className="col-start-2">
          Ability <br /> Score
        </span>
        <span className="col-start-3">
          Ability <br /> Modifier
        </span>
        <span className="col-start-4">
          Temp <br /> Score
        </span>
        <span className="col-start-5">
          Temp <br /> Modifier
        </span>

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
