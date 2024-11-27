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
    <div className="flex m-2 gap-5">
      <div className="flex flex-col min-w-32 w-1/6">
        <label htmlFor="HP" className="input-label">Health Points</label>
        <input
          type="number"
          className="input-base w-full"
          name="HP"
          id="HP"
          disabled
          value={healthPoints}
        />
      </div>
      <div className="flex flex-col min-w-32 w-1/6">
        <label htmlFor="hitDie" className="input-label">Hit die</label>
        <input
          className="input-base  w-full"
          type="number"
          name="hitDie"
          id="hitDie"
          value={hitDie}
          onChange={(e) => setHitDie(Number(e.target.value))}
        />
      </div>
      <button
        type="submit"
        className="ring-2 ring-blue-500 p-2 md:py-4 md:px-8 self-end bg-blue-300"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
}

export default Health;
