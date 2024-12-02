import React from "react";
import Ability from "../../components/character/Stats/Ability.tsx";
import CharacterInformation from "../../components/character/Details/CharacterInformation.tsx";
import Status from "../../components/character/Status/Status.tsx";
import Bonuses from "../../components/character/Bonuses/Bonuses.tsx";
import SavingThrows from "../../components/character/SavingThrows/SavingThrows.tsx";
import Skills from "../../components/character/Skills/Skills.tsx";

function Overview() {
  /* HUSKAT - Centraliser abliity modifiers og send via props */

  return (
    <div className="container min-h-screen lg:mx-auto max-xl:min-w-full grid grid-cols-1 md:grid-cols-3">
      <div className="col-span-full lg:col-span-3 bg-red-300">
        <CharacterInformation />
      </div>
      <div className="col-span-full lg:col-span-3 bg-green-300">
        <Status />
      </div>
      <div className="col-span-full md:col-span-2 md:row-span-2 lg:col-span-1 bg-blue-300">
        <Ability />
      </div>
      <div className="col-span-full md:row-start-3 md:col-span-1 md:col-start-3 lg:col-start-2 bg-pink-300">
        <Bonuses />
      </div>
      <div className="col-span-full md:row-start-4 md:col-span-1 md:col-start-3 lg:col-start-2 bg-yellow-300">
        <SavingThrows />
      </div>
      <div className="col-span-full lg:col-span-2 bg-amber-500">
        WEAPONS AND ARMOR <div>WEP 1</div> <div>WEP 2</div> <div>WEP 3</div>
        {" "}
        <div>ARMOR</div> <div>SHIELD</div> <div>Misc</div>
      </div>

      <div className="col-span-full lg:col-start-3 lg:row-start-3 lg:row-span-3 bg-purple-300">
        <Skills />
      </div>
    </div>
  );
}

export default Overview;
