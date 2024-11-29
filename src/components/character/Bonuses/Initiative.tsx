import { useEffect, useState } from "react";

function Initiative() {
  /* HUSKAT - Centraliser abliity modifiers og send via props */
  const [dexterity, setDexterity] = useState<number>(5);
  const [miscModifier, setMiscModifier] = useState<number>("");
  const [initiativeTotal, setInitiativeTotal] = useState<number>(0);

  // update initiativeTotal whenever dex or misc changes
  useEffect(() => {
    setInitiativeTotal(dexterity + (miscModifier ? miscModifier : 0));
  }, [dexterity, miscModifier]);

  // event handler for misc modifier
  const handleMiscModifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setMiscModifier(value);
  };
  return (
    <div className="flex flex-col align-middle m-5">
      <h1 className="input-title text-start">Initiative</h1>
      <div className="flex  justify-between  gap-2">
        <div className="flex flex-col-reverse self-start">
          <label htmlFor="initiativeTotal">Total</label>
          <input
            className="input-base w-full"
            type="number"
            name="initiativeTotal"
            id="initiativeTotal"
            value={initiativeTotal}
            disabled
          />
        </div>
        <span className="input-label pt-4">=</span>
        <div className="flex flex-col-reverse">
          <label className="input-label" htmlFor="dexMod">
            Dex <br /> Modifier
          </label>
          <input
            className="input-base  w-full"
            type="number"
            name="dexMod"
            id="dexMod"
            value={dexterity}
            disabled
          />
        </div>
        <span className="input-label pt-4">+</span>
        <div className="flex flex-col-reverse">
          <label className="input-label" htmlFor="miscMod">
            Misc <br /> modifier
          </label>
          <input
            className="input-base  w-full"
            type="number"
            name="miscMod"
            id="miscMod"
            value={miscModifier}
            onChange={handleMiscModifierChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Initiative;
