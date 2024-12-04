import { useState } from "react";

import Armor from "./Armor.tsx";
import MiscItem from "./Misc.tsx";
import Shield from "./Shield.tsx";
import Weapon from "./Weapon.tsx";

function Gear() {
  const [isWeaponsVisible, setIsWeaponsVisible] = useState(true);
  const [isArmorVisible, setIsArmorVisible] = useState(true);
  const [isShieldVisible, setIsShieldVisible] = useState(true);
  const [isMiscVisible, setIsMiscVisible] = useState(true);

  return (
    <div className="px-2 py-2 space-y-4">
    <div className="gear-container">
      <h1>GEAR</h1>

      <div className="p-4 space-y-4">
        {/* Weapons Section */}
        <div>
          <h1
            className="cursor-pointer"
            onClick={() => setIsWeaponsVisible(!isWeaponsVisible)}
          >
            Weapons {isWeaponsVisible ? "v" : "^"}
          </h1>
          <div
            className={` transition-max-height duration-500 ease-in-out overflow-hidden ${
              isWeaponsVisible ? "max-h-[1000px]" : "max-h-0"
            }`}
          >
            <div className="p-4">
              <Weapon name={"Excalibur"} />
              <Weapon name={"Frostmourne"} />
              <Weapon name={"Battleaxe"} />
            </div>
          </div>
        </div>

        {/* Armor Section */}
        <div>
          <h1
            className="cursor-pointer"
            onClick={() => setIsArmorVisible(!isArmorVisible)}
          >
            Armor {isArmorVisible ? "v" : "^"}
          </h1>
          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
              isArmorVisible ? "max-h-[1000px]" : "max-h-0"
            }`}
          >
            <div className="p-4">
              <Armor name={"Heavy leather armor"} />
            </div>
          </div>
        </div>

        {/* Shield Section */}
        <div>
          <h1
            className="cursor-pointer"
            onClick={() => setIsShieldVisible(!isShieldVisible)}
          >
            Shield {isShieldVisible ? "v" : "^"}
          </h1>
          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
              isShieldVisible ? "max-h-[1000px]" : "max-h-0"
            }`}
          >
            <div className="p-4">
              <Shield name={"Buckler"} />
            </div>
          </div>
        </div>

        {/* Miscellaneous Items Section */}
        <div>
          <h1
            className="cursor-pointer"
            onClick={() => setIsMiscVisible(!isMiscVisible)}
          >
            Miscellaneous items {isMiscVisible ? "v" : "^"}
          </h1>
          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
              isMiscVisible ? "max-h-[1000px]" : "max-h-0"
            }`}
          >
            <div className="p-4">
              <MiscItem name={"Necklace of charming personality"} />
              <MiscItem name={"The one ring"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Gear;
