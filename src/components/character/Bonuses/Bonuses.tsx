import BaseAttack from "./BaseAttack.tsx";
import Initiative from "./Initiative.tsx";


function Bonuses() {
  return (
    <div className="flex flex-col">

      <BaseAttack />
      <Initiative />
    </div>
  );
}

export default Bonuses;
