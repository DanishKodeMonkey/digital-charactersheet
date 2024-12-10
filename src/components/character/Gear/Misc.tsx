import { useState } from "react";
import { MiscItemTypeProp } from "../../../types/inventory.ts";

// huskat: seperate types to typefile


function MiscItem({ name }: MiscItemTypeProp) {
  const [itemName, setItemName] = useState<string>(name ? name : "");
  const [itemACMod, setItemACMod] = useState<string>("");
  const [itemWeight, setItemWeight] = useState<number>("");
  const [itemSpecials, setItemSpecials] = useState<string>("");

  return (
    <div className="grid grid-cols-8 gap-4 m-2 p-2 bg-yellow-500 bg-opacity-80">
      <div className="col-span-3 flex flex-col justify-between">
        <label className="input-label" htmlFor="itemName">
          Protective Item
        </label>
        <input
          className="small-input input-string-text "
          type="text"
          name="itemName"
          id="itemName"
          defaultValue={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>

      <div className="col-span-1 flex flex-col justify-between">
        <label className="input-label" htmlFor="itemAC">AC Bonus</label>
        <input
          className="small-input input-string-text "
          type="text"
          name="itemAC"
          id="itemAC"
          value={itemACMod}
          onChange={(e) => setItemACMod(e.target.value)}
        />
      </div>

      <div className="col-span-1 flex flex-col justify-between">
        <label className="input-label" htmlFor="itemWeight">Weight</label>
        <input
          className="small-input input-string-text "
          type="text"
          name="itemWeight"
          id="itemWeight"
          value={itemWeight}
          onChange={(e) => setItemWeight(e.target.value)}
        />
      </div>

      <div className="col-span-3 flex flex-col justify-between">
        <label className="input-label" htmlFor="itemSpecials">
          Special Properties
        </label>
        <input
          className="small-input input-string-text "
          type="text"
          name="itemSpecials"
          id="itemSpecials"
          value={itemSpecials}
          onChange={(e) => setItemSpecials(e.target.value)}
        />
      </div>
    </div>
  );
}

export default MiscItem;
