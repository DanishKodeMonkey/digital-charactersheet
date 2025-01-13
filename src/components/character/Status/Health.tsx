import { useEffect, useState } from "react";
import { useCentralization } from "../../CentralisationLayer/CentralisationContext.tsx";


function Health() {
  const [healthPoints, setHealthPoints] = useState<number>(30);
  const [hitDie, setHitDie] = useState<number>("");
  const constitutionModifier = 2;

  const updateHealth = () => {
    const newHealth = hitDie + constitutionModifier;
    setHealthPoints((prevHealth) => prevHealth + newHealth);
  };

  const handleSubmit = () => {
    updateHealth();
    setHitDie("");
  };

  return (
    <div className="grid grid-rows-2">
      <div className="grid grid-cols-4 text-center">
        <label htmlFor="HP" className="input-label col-span-1">
          Health <br /> Points
        </label>
        <span className="col-span-1 text-xs md:input-label">+</span>
        <label htmlFor="hitDie" className="input-label col-span-1">
          Hit die
        </label>
      </div>
      <div className="grid grid-cols-4 gap-3 text-center">
        <input
          type="number"
          className="input-small w-full col-span-1"
          name="HP"
          id="HP"
          disabled
          value={healthPoints}
        />
        <span className="col-span-1 text-xs md:input-label">+</span>
        <input
          className="input-small w-full col-span-1"
          type="number"
          name="hitDie"
          id="hitDie"
          value={hitDie}
          onChange={(e) => setHitDie(Number(e.target.value))}
        />
        <button
          type="submit"
          className="col-span-1 btn btn-primary"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Health;
