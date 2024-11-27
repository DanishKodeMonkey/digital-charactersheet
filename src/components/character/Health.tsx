import { useEffect, useState } from "react";

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
    <div>
      <div className="grid grid-cols-3 m-2">
        <label htmlFor="HP" className="input-label col-span-1">Health <br /> Points</label>
        <label htmlFor="hitDie" className="input-label col-span-1">Hit die</label>
    </div>
    <div className="grid grid-cols-3">
        <input
          type="number"
          className="small-input"
          name="HP"
          id="HP"
          disabled
          value={healthPoints}
        />
                <input
          className="small-input"
          type="number"
          name="hitDie"
          id="hitDie"
          value={hitDie}
          onChange={(e) => setHitDie(Number(e.target.value))}
        />
             <button
        type="submit"
        className="ring-2 ring-blue-500 self-end h-full w-1/2 bg-blue-300"
        onClick={handleSubmit}
      >
        Add
      </button>
      </div>

 
    </div>
  );
}

export default Health;
