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
  const [ranks, setRanks] = useState<number>(0);
  const [miscMod, setMiscMod] = useState<number>(0);

  const toggleLearned = () =>{
    setLearned((prevLearned) => !prevLearned)
  }

  return (
    <div className="skill-row">
      <input type="checkbox" name="learned" id="learned" checked={learned} onChange={toggleLearned}/>
      <label htmlFor={`${skill.name}`}>
        {skill.name}
      </label>
      <span>{skill.keyAbility}</span>
      <input
        type="number"
        name="skillModifier"
        id={`skillModifier-${skill.name}`}
        value={skillMod ? skillMod : 0}
        onChange={(e) => setSkillMod(parseInt(e.target.value))}
      />
      <input type="number" name="abilityModifier" id={`abilityModifier-${skill.name}`} value={abilityMod}        />
      <input type="number" name="ranksModifier" id={`ranksModifier-${skill.name}`} value={ranks ? ranks : 0}        onChange={(e) => setRanks(parseInt(e.target.value))}/>
      <input type="number" name="miscModifier" id={`miscModifier-${skill.name}`} value={miscMod ? miscMod : 0}        onChange={(e) => setMiscMod(parseInt(e.target.value))}/>

    </div>
  );
}


export default SkillRow