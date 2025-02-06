import {useEffect, useState} from 'react'
import { SkillRowProps } from "../../../types/character.ts";
import { useCentralization } from "../../CentralisationLayer/CentralisationContext.tsx";

// huskat: seperate types to typefile

function SkillRow({ skill }: SkillRowProps) {
  const { state, dispatch } = useCentralization();

  const { learned, abilityName, ranks, miscMod } =
    state.skills.skills[skill.name];

  const classSkills = state.characterDetails.class.classSkills as Set<string>
  const abilityMod = state.stats.modifiers[abilityName] || 0;

  const skillMod = ranks + abilityMod + miscMod;

  const [inputValue, setInputValue] = useState(ranks.toString())
  const [error, setError] = useState<boolean>(false) // local error state

  // calculate skillMod total
useEffect(() =>{
  // set .has returns bool
  const isClassSkill = classSkills.has(skill.name)
  
  // isClassSkill and learned different? Update to match
  if(isClassSkill !== learned){
    
    dispatch({
      field: "skills",
      type: "UPDATE_SKILL_LEARNED",
      payload: {skill: skill.name, value: isClassSkill},
      skipDebounce: true
      
    })
    
  }
},[classSkills, skill.name, learned, dispatch])

  const updateRanks = (value: number) => {
    const currentRanks = state.skills.skills[skill.name].ranks
    const rankDifference = value - currentRanks

    if(state.skills.skillPoints.current - rankDifference < 0){
      console.warn("Not enough skill points! Skipped, reset to ", ranks);
      setError(true)
      setInputValue(ranks.toString())
      setTimeout(() => setError(false), 2000);
      return;
    }else{
      const spentRanks = learned ? value : value * 2
    dispatch({
      field: "skills",
      type: "UPDATE_SKILL",
      payload: { skill: skill.name, field: "ranks", value: spentRanks },
      skipDebounce: true
    })};
    setInputValue(value.toString())
  };
  const updateMiscMod = (value: number) => {
    dispatch({
      field: "skills",
      type: "UPDATE_SKILL",
      payload: { skill: skill.name, field: "miscMod", value },
    });
  };

  // HUSKAT: Styling to sheet
  return (
    <div className="skill-row flex space-between">
      <div className="w-1/12">
        <input
          type="checkbox"
          name="learned"
          id="learned"
          checked={learned}
          readOnly
          />
      </div>
      <label className="w-1/3 text-sm" htmlFor={`${skill.name}`}>
        {skill.name}
      </label>
      <span className="text-xs mr-2">
        {abilityName.slice(0, 3).toUpperCase()}
      </span>
      <div className="flex w-1/2">
        <div className="w-1/4">
          <input
            type="number"
            name="skillModifier"
            className="input-micro"
            id={`skillModifier-${skill.name}`}
            value={skillMod}
            disabled
          />
        </div>

        <div className="w-1/4">
          <input
            className="input-micro"
            type="number"
            name="abilityModifier"
            id={`abilityModifier-${skill.name}`}
            value={abilityMod}
            disabled
          />
        </div>
        <div className="w-1/4">
        {error && (
  <div className="absolute bg-red-500 text-white text-xs px-2 py-1 rounded-md">
    Not enough skill points!
  </div>
)}
          <input
            className="input-micro"
            type="number"
            name="ranksModifier"
            id={`ranksModifier-${skill.name}`}
            value={inputValue}
            onFocus={(e) => {
              e.target.value = "";
            }} // Clear value on focus
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={(e) => {
              if (e.target.value === "") {
                setInputValue(ranks); // Reset to original state if blank
              } else {
                updateRanks(Number(e.target.value));// Update state with the new value
              }
            }}
          />
        </div>
        <div className="w-1/4">
          <input
            className="input-micro"
            type="number"
            name="miscModifier"
            id={`miscModifier-${skill.name}`}
            defaultValue={miscMod.toString()}
            onFocus={(e) => {
              e.target.value = "";
            }} // Clear value on focus
            onBlur={(e) => {
              if (e.target.value === "") {
                console.log(e.target.value);

                e.target.value = miscMod.toString(); // Reset to original state if blank
              } else {
                updateMiscMod(Number(e.target.value)); // Update state with the new value
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SkillRow;
