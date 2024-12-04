import Armor from "./Armor.tsx";
import MiscItem from "./Misc.tsx";
import Weapon from "./Weapon.tsx";

function Gear() {
  return (
    <div>
      <h1>GEAR</h1>
      <h2>Weapons</h2>
      <Weapon name={"Excalibur"} />
      <Weapon name={"Frostmourne"} />
      <Weapon name={"Battleaxe"} />

      <h2>Armor</h2>
      <Armor name={"Heavy leather armor"} />

      <h3>Shield</h3>

      <h2>Miscellaneous items</h2>
      <MiscItem name={"Necklace of charming personality"} />
      <MiscItem name={"The one ring"} />
    </div>
  );
}

export default Gear;
