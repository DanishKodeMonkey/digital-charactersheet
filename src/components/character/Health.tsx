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
    <div className="flex m-2 gap-2">
      <div className="flex flex-col">
        <label htmlFor="HP" className="input-label my-auto">Health <br /> Points</label>
        <input
          type="number"
          className="small-input min-w-12"
          name="HP"
          id="HP"
          disabled
          value={healthPoints}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="hitDie" className="input-label my-auto">Hit die</label>
        <input
          className="small-input min-w-12"
          type="number"
          name="hitDie"
          id="hitDie"
          value={hitDie}
          onChange={(e) => setHitDie(Number(e.target.value))}
        />
      </div>
      <button
        type="submit"
        className="ring-2 ring-blue-500  py-1 md:py-2 md:px-8 self-end bg-blue-300"
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
}

export default Health;
