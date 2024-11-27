
import React from "react";
import Ability from "../../components/character/Ability.tsx";
import CharacterInformation from "../../components/character/CharacterInformation.tsx";


function Overview() {
  return (
        <div className="container min-h-screen mx-auto grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-full md:col-span-3 bg-red-300"><CharacterInformation /></div>
            <div className="col-span-full md:col-span-3 bg-green-300">HEALTH AND AC</div>
            <div className="col-span-full md:col-span-1 bg-blue-300"><Ability /></div>
            <div className="col-span-full md:col-span-1 md:col-start-2 bg-pink-300">INITIATIVE AND <br />  BASE ATTACK BONUS</div>
            <div className="col-span-full md:col-span-2 bg-yellow-300">SAVING THROWS</div>
            <div className="col-span-full md:col-span-2 bg-amber-500">WEAPONS AND ARMOR <div>WEP 1</div> <div>WEP 2</div> <div>WEP 3</div> <div>ARMOR</div> <div>SHIELD</div> <div>Misc</div></div>

            <div className="md:col-start-3 md:row-start-3 md:row-span-3 bg-purple-300">SKILLS</div>
        </div>
  );
}

export default Overview;
