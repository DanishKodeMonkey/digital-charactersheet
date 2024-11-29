import { useEffect, useState } from "react";

function ArmorClass() {
  const [acTotal, setAcTotal] = useState<number>(0);
  const [aBonus, setABonus] = useState<number>("");
  const [dexterity, setDexterity] = useState<number>(5);
  const [sizeModifier, setSizeModifier] = useState<number>("");
  const [naturalArmor, setNaturalArmor] = useState<number>("");
  const [miscModifier, setMiscModifier] = useState<number>("");

  useEffect(() => {
    setAcTotal(
      10 + (aBonus ? aBonus : 0) + dexterity -
        (sizeModifier ? sizeModifier : 0) + (naturalArmor ? naturalArmor : 0) +
        (miscModifier ? miscModifier : 0),
    );
  }, [aBonus, sizeModifier, naturalArmor, miscModifier]);

  return (
    <div className="grid grid-rows-2">
      {/* Header Row */}
      <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] font-bold items-center text-center">
        <span className="col-span-1 md:col-span-1 text-xs">#</span>
        <span className="col-span-1 md:col-span-1 text-xs">Total</span>
        <span className="col-span-1 text-xs max-sm:hidden">=</span>
        <span className="col-span-2 md:col-span-1 text-xs">Base</span>
        <span className="col-span-1 text-xs max-sm:hidden">+</span>
        <span className="col-span-2 md:col-span-1 text-xs">
          Armor<br />Bonus
        </span>
        <span className="col-span-1 text-xs max-sm:hidden">+</span>
        <span className="col-span-2 md:col-span-1 text-xs">
          Dex<br />Modifier
        </span>
        <span className="col-span-1 text-xs max-sm:hidden">-</span>
        <span className="col-span-2 md:col-span-1 text-xs">
          Size<br />Modifier
        </span>
        <span className="col-span-1 text-xs max-sm:hidden">+</span>
        <span className="col-span-2 md:col-span-1 text-xs">
          Natural<br />Armor
        </span>
        <span className="col-span-1 text-xs max-sm:hidden">+</span>
        <span className="col-span-2 md:col-span-1 text-xs">
          Misc<br />Modifier
        </span>
      </div>

      {/* Input Row */}
      <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] items-center text-center">
        <label htmlFor="totalAC" className="col-span-1">AC</label>
        <input
          type="number"
          name="totalAC"
          id="totalAC"
          disabled
          value={acTotal}
          className="col-span-1 small-input w-full"
        />
        <span >=</span>
        <span className="text-2xl">10</span>
        <span>+</span>
        <input
          type="number"
          name="armorBonus"
          id="armorBonus"
          className="col-span-1 small-input w-full"
          value={aBonus}
          onChange={(e) => setABonus(parseInt(e.target.value))}
        />
        <span>+</span>
        <input
          type="number"
          name="dexMod"
          id="dexMod"
          disabled
          value={dexterity}
          className="col-span-1 small-input w-full"
        />
        <span>-</span>
        <input
          type="number"
          name="sizeMod"
          id="sizeMod"
          className="col-span-1 small-input w-full"
          value={sizeModifier}
          onChange={(e) => setSizeModifier(parseInt(e.target.value))}
        />
        <span>+</span>
        <input
          type="number"
          name="natArmor"
          id="natArmor"
          className="col-span-1 small-input w-full"
          value={naturalArmor}
          onChange={(e) => setNaturalArmor(parseInt(e.target.value))}
        />
        <span>+</span>
        <input
          type="number"
          name="miscMod"
          id="miscMod"
          className="col-span-1 small-input w-full"
          value={miscModifier}
          onChange={(e) => setMiscModifier(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
}

export default ArmorClass;
