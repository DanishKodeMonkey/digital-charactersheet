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
      <div className="gear-container z-0">
        <h1>GEAR</h1>

        <div className="p-4">
          <div
            className="weapons-container z-30"
            onClick={() => setIsWeaponsVisible(!isWeaponsVisible)}
          >
            <h1>Weapons {isWeaponsVisible ? "v" : "^"}</h1>
            {isWeaponsVisible && (
              <div className="p-4">
                <Weapon name={"Excalibur"} />
                <Weapon name={"Frostmourne"} />
                <Weapon name={"Battleaxe"} />
              </div>
            )}
          </div>
          <div
            className="armor-container"
            onClick={() => setIsArmorVisible(!isArmorVisible)}
          >
            <h1>Armor {isArmorVisible ? "v" : "^"}</h1>
            {isArmorVisible && (
              <div className="p-4">
                <Armor name={"Heavy leather armor"} />
              </div>
            )}
          </div>
          <div
            className="shield-container"
            onClick={() => setIsShieldVisible(!isShieldVisible)}
          >
            <h1>Shield {isShieldVisible ? "v" : "^"}</h1>
            {isShieldVisible && (
              <div className="p-4">
                <Shield name={"Buckler"} />
              </div>
            )}
          </div>
          <div
            className="shield-container"
            onClick={() => setIsMiscVisible(!isMiscVisible)}
          >
            <h1>Miscellaneous items {isMiscVisible ? "v" : "^"}</h1>
            {isMiscVisible && (
              <div className="p-4">
                <MiscItem name={"Necklace of charming personality"} />
                <MiscItem name={"The one ring"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gear;
