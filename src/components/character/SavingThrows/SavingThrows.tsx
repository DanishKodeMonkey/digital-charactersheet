import React from "react";
import SaveRow from "./SaveRow.tsx";

function SavingThrows() {
  // Map saveType to corresponding ability modifier name
  const saveTypeToAbilityMap: Record<"fortitude" | "reflex" | "will", string> =
    {
      fortitude: "constitution",
      reflex: "dexterity",
      will: "wisdom",
    };

  // save types to itterate over
  const saveTypes: Array<"fortitude" | "reflex" | "will"> = [
    "fortitude",
    "reflex",
    "will",
  ];

  return (
    <div className="container p-4">
      <div className="flex flex-col">
        <div className="grid grid-cols-[1fr,2.2fr]">
          <div>
            <span className="ability-row-headers text-xl leading-none">
              Saving Throws
            </span>
          </div>
          <div className="grid grid-cols-6 items-end text-center">
            <span className="ability-row-headers text-[.9rem] font-extrabold leading-none">
              Total
            </span>
            <span className="ability-row-headers text-[.7rem] leading-none">
              Base <br /> save
            </span>
            <span className="ability-row-headers text-[.7rem] leading-none">
              Ability <br /> mod
            </span>
            <span className="ability-row-headers text-[.7rem] leading-none">
              magic <br /> mod
            </span>
            <span className="ability-row-headers text-[.7rem] leading-none">
              misc <br /> mod
            </span>
            <span className="ability-row-headers text-[.7rem] leading-none">
              temp <br /> mod
            </span>
          </div>
        </div>
        <hr className="border-b-2 m-1" />
        <div className="grid grid-rows-3 grid-cols-[1fr,2fr] pr-1">
          {saveTypes.map((saveType) => {
            const ability = saveTypeToAbilityMap[saveType];

            return (
              <React.Fragment key={saveType}>
                <div>
                  <h1 className="text-sm capitalize">
                    {saveType}
                  </h1>
                  <h2 className="text-xs">({ability})</h2>
                </div>
                <div>
                  <SaveRow saveType={saveType} />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SavingThrows;
