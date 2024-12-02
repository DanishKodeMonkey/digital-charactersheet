import { useState } from "react";


// huskat: seperate types to typefile
interface Skill {
    name: string;
    keyAbility: string;
}

interface SkillRowProps{
    skill: Skill;
}

function SkillRow({ skill }: SkillRowProps) {
  const [learned, setLearned] = useState<boolean>(false);
  const [skillMod, setSkillMod] = useState<number>(0);
  const [abilityMod, setAbilityMod] = useState<number>(5);
  const [ranks, setRanks] = useState<number>("");
  const [miscMod, setMiscMod] = useState<number>("");

  const toggleLearned = () =>{
    setLearned((prevLearned) => !prevLearned)
  }

  // HUSKAT: Styling to sheet
  return (
    <div className="skill-row flex space-between">
      <div className="w-1/12">
<input type="checkbox" name="learned" id="learned" checked={learned} onChange={toggleLearned}/></div>
      <label className="w-1/3 text-sm" htmlFor={`${skill.name}`}>
        {skill.name}
      </label>
      <span className="text-xs mr-2">{skill.keyAbility}</span>
      <div className="flex w-1/2">
      <div className="w-1/4">
          <input
            type="number"
            name="skillModifier"
            className="input-micro"
            id={`skillModifier-${skill.name}`}
            value={skillMod ? skillMod : 0}
           disabled
          />
      </div>

          <div className="w-1/4">
          <input className="input-micro" type="number" name="abilityModifier" id={`abilityModifier-${skill.name}`} value={abilityMod}    disabled    /></div>
          <div className="w-1/4">
          <input className="input-micro" type="number" name="ranksModifier" id={`ranksModifier-${skill.name}`} value={ranks ? ranks : 0}        onChange={(e) => setRanks(parseInt(e.target.value))}/></div>
          <div className="w-1/4">
          <input className="input-micro" type="number" name="miscModifier" id={`miscModifier-${skill.name}`} value={miscMod ? miscMod : 0}        onChange={(e) => setMiscMod(parseInt(e.target.value))}/></div>
          
              </div>
      </div>
  );
}


export default SkillRow