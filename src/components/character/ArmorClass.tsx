function ArmorClass() {
  return (
    <div>
        <div className="grid grid-rows-2 m-2">
          <div className="grid grid-cols-8 font-bold">
            <span className="col-span-1 text-center">#</span>
            <span className="col-span-1">Total</span>
            <span className="col-span-1">Base</span>
            <span className="col-span-1">
              Armor <br /> bonus
            </span>{" "}
            <span className="col-span-1">
              Dex <br /> Modifier
            </span>{" "}
            <span className="col-span-1">
              Size <br /> modifier
            </span>{" "}
            <span className="col-span-1">
              Natural <br /> armor
            </span>{" "}
            <span className="col-span-1">
              Misc <br /> modifier
            </span>
          </div>
          <div className="grid grid-cols-8 items-center">
            <label htmlFor="totalAC" className="text-center">AC</label>
            <input
              type="number"
              name="totalAC"
              id="totalAC"
              disabled
              className="small-input"
            />
            <span>= 10 +</span>
            <input
              type="number"
              name="armorBonus"
              id="armorBonus"
              className="small-input"
            />
            <input
              type="number"
              name="dexMod"
              id="dexMod"
              disabled
              className="small-input"
            />
            <input
              type="number"
              name="sizeMod"
              id="sizeMod"
              className="small-input"
            />
            <input
              type="number"
              name="natArmor"
              id="natArmor"
              className="small-input"
            />
            <input
              type="number"
              name="miscMod"
              id="miscMod"
              className="small-input"
            />
          </div>
        </div>
    </div>
  );
}

export default ArmorClass;
